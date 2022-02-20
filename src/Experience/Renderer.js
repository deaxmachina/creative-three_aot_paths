import * as THREE from 'three'
import Experience from './Experience'

export default class Renderer {
  constructor() {
    this.experience = new Experience()
    // Get the things we need from the experience
    this.canvas = this.experience.canvas
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene 
    this.camera = this.experience.camera

    // Start the instance of the Renderer 
    this.setInstance()
  }

  // Create the instance of the Renderer
  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    })
    this.instance.setClearColor('#040c25')
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }

  // What happens to the renderer when resized
  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }

  // What happens to the renderer on animation tick 
  update() {
    this.instance.render(this.scene, this.camera.instance)
  }
}