import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader'
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
    this.setInstance()
    this.addRgbPass()
  }

  // Create the instance of the Effect Composer
  setInstance() {
    this.instance = new EffectComposer(this.renderer)
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

  // Add RGBPass
  addRgbPass() {
    this.rgbShiftPass = new ShaderPass(RGBShiftShader)
    this.rgbShiftPass.enabled = true
    this.rgbShiftPass.uniforms[ 'amount' ].value = 0.004;
    this.instance.addPass(this.rgbShiftPass)
  }

}