import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass'
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import Experience from './Experience'

export default class Composer {
  constructor() {
    this.experience = new Experience()
    // Get the things we need from the experience
    this.canvas = this.experience.canvas
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene 
    this.camera = this.experience.camera.instance
    this.renderer = this.experience.renderer.instance

    // Start the instance of the Effect Composer 
    this.getRenderTarget()
    this.setInstance()
    this.addRgbPass()
    //this.addDotScreenPass()
    // this.addUnrealBloomPass()
    // this.addGammaCorrectionPass()
    this.addSmaaPass()
  }

  // Create our own renderTarget 
  getRenderTargetClass() {
    if (this.renderer.getPixelRatio() <= 2 && this.renderer.capabilities.isWebGL2) {
        this.renderTargetClass = THREE.WebGLMultisampleRenderTarget
    } else {
        this.renderTargetClass = THREE.WebGLRenderTarget
    }
  }

  getRenderTarget() {
    this.getRenderTargetClass()
    this.renderTarget = new this.renderTargetClass(
      600, 
      800, 
      {
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          format: THREE.RGBAFormat
      }
    )
  }

  // Create the instance of the Effect Composer
  setInstance() {
    this.instance = new EffectComposer(this.renderer, this.renderTarget) //this.renderTarget
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
    // This is just the initial render
    const renderPass = new RenderPass(this.scene, this.camera)
    // Add a pass (effect) to the effect composer
    this.instance.addPass(renderPass)
  }

  // What happens to the effect composer when resized
  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }

  // What happens to the effect composer on animation tick 
  update() {
    this.instance.render()
  }

  // Add RGB Pass
  addRgbPass() {
    this.rgbShiftPass = new ShaderPass(RGBShiftShader)
    this.rgbShiftPass.enabled = true
    this.rgbShiftPass.uniforms['amount'].value = 0.005;
    this.rgbShiftPass.uniforms['angle'].value = 2;
    this.instance.addPass(this.rgbShiftPass)
  }

  // Add GammaCorrection Pass
  addGammaCorrectionPass() {
    // Make sure this pass it added at the end 
    // it converts colour from linear to sRGB to fix colour issues
    this.gammaCorrectionPass = new ShaderPass(GammaCorrectionShader)
    this.instance.addPass(this.gammaCorrectionPass)
  }

  // Add DotScree Pass
  addDotScreenPass() {
    this.dotScreenPass = new DotScreenPass()
    this.instance.addPass(this.dotScreenPass)
  }

  // Add unreal bloom pass 
  addUnrealBloomPass() {
    this.unrealBloomPass = new UnrealBloomPass()
    this.unrealBloomPass.strength = 0.1
    this.unrealBloomPass.radius = 1
    this.unrealBloomPass.threshold = 0.9
    this.instance.addPass(this.unrealBloomPass)
  }


  // This is for the antialias correction - make sure it is at the end
  addSmaaPass() {
    if (this.renderer.getPixelRatio() === 1 && !this.renderer.capabilities.isWebGL2) {
      this.smaaPass = new SMAAPass()
      this.instance.addPass(this.smaaPass)
    }
  }
  

}