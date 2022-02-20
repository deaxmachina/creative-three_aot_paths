import * as THREE from 'three'
import Sizes from './utils/Sizes'
import Time from './utils/Time'
import Camera from './Camera'
import Renderer from './Renderer'
import Composer from './Composer'
import World from './World/World'

let instance = null

export default class Experience {
  constructor(canvas, renderWithComposer=true) {
    if (instance) {
      return instance
    }
    instance = this
    // Global access 
    window.experience = this

    // Options 
    this.canvas = canvas
    this.renderWithComposer = renderWithComposer

    // Setup
    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new THREE.Scene()
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.composer = new Composer()
    this.world = new World()

    // Events - resize and animation tick 
    this.sizes.on('resizeHappened', () => {
      this.resize()
    })
    this.time.on('tick', () => {
      this.update()
    })
  }

  resize() {
    this.camera.resize()
    // on resize update both the renderer and the effect composer
    this.renderer.resize()
  }
  update() {
    this.camera.update()
    this.world.update()
    // on animation tick update *only* either the renderer or the effect composer
    if (this.renderWithComposer) {
      this.composer.update()
    } else {
      this.renderer.update()
    }
  }

}