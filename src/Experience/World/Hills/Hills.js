import * as THREE from 'three'
import Experience from '../../Experience'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

export default class Hills {
  constructor() {
    this.experience = new Experience()
    // Get the things we need from the experience 
    this.scene = this.experience.scene
    this.time = this.experience.time

    // Parameters 

    // Draw 
    this.setTexture()
    this.setMaterial()
    this.setGeometry()
    this.setMesh()
  }

  setTexture() {
    this.texture = {}
    this.texture.linesCount = 5
    this.texture.width = 32
    this.texture.height = 128
    this.texture.canvas = document.createElement('canvas')
    this.texture.canvas.width = this.texture.width
    this.texture.canvas.height = this.texture.height
    this.texture.canvas.style.position = 'fixed'
    this.texture.canvas.style.top = 0
    this.texture.canvas.style.left = 0
    this.texture.canvas.style.zIndex = 1

    document.body.append(this.texture.canvas)

    this.texture.context = this.texture.canvas.getContext('2d')

    this.texture.instance = new THREE.CanvasTexture(this.texture.canvas)
    this.texture.instance.wrapS = THREE.RepeatWrapping
    this.texture.instance.wrapT = THREE.RepeatWrapping

    this.texture.update = () => {
      this.texture.context.clearRect(0, 0, this.texture.width, this.texture.height)  
  
      this.texture.context.globalAlpha = 1;
      this.texture.context.fillStyle = '#fff'
      this.texture.context.fillRect(
          0, 
          0, 
          this.texture.width, 
          Math.round(this.texture.height * 0.07)
      )
      const smallLinesCount = this.texture.linesCount - 1
      for (let i = 0; i < smallLinesCount; i++) {
        this.texture.context.globalAlpha = 0.5;
        this.texture.context.fillRect(
              0, 
              Math.round(this.texture.height / (smallLinesCount + 1)) * (i + 1), 
              this.texture.width, 
              Math.round(this.texture.height * 0.01)
          )  
        }
    }
  //   this.texture.update = () => {
  //     this.texture.context.clearRect(0, 0, this.texture.width, this.texture.height)
  //     this.texture.context.fillStyle = '#012a4a'
  //     this.texture.context.fillRect(0, Math.round(this.texture.height * 0), this.texture.width, 100)
  //     this.texture.context.fillStyle = '#fff'
  //     this.texture.context.fillRect(0, Math.round(this.texture.height * 0.4), this.texture.width, 20)
  //     this.texture.context.fillStyle = '#fff'
  //     this.texture.context.fillRect(0, Math.round(this.texture.height * 0.9), this.texture.width, 10)    
  //   }
    this.texture.update()
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({ 
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
          uTexture: { value: this.texture.instance },
          uElevation: { value: 2 }
      }
    })
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(3, 3, 1000, 1000)
    this.geometry.rotateX(-Math.PI * 0.5)
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.scale.set(10, 10, 10)
    this.mesh.rotation.z = Math.PI;
    this.mesh.position.y -= 3;
    this.scene.add(this.mesh)
  }

  update() {
    //this.material.uniforms.uTime.value += this.time.delta * 0.001
  }
}