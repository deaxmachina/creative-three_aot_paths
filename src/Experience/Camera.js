import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Experience from './Experience'

export default class Camera {
  constructor() {
    this.experience = new Experience()

    // Get the things we need from the experience 
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene 
    this.canvas = this.experience.canvas

    // Instantiate the camera and orbit controls 
    this.setInstance()
    this.setOrbitControls()
  }

  // The Camera 
  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      55,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    )
    this.instance.position.set(0, -4, 2.5)
    this.scene.add(this.instance)
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas)
    this.controls.enableDamping = true
  }

  // Just the logic for what happens to camera on resize event
  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  // What happens to the camera on each tick of the animation
  update() {
    this.controls.update()
  }
}