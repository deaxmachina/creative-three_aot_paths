import * as THREE from 'three'
import Experience from '../Experience'

export default class Environment {
  constructor() {
    this.experience = new Experience()
    // Get the things we need from the experience 
    this.scene = this.experience.scene 

    // The lights we want in the scene 
    this.setSunLight()
    
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight('#000000', 10)
    // this.sunLight.castShadow = true 
    // this.sunLight.shadow.camera.far = 14
    // this.sunLight.shadow.mapSize.set(1024, 1024)
    // this.sunLight.shadow.normalBias = 0.05
    this.sunLight.position.set(0, 0, -2)
    this.scene.add(this.sunLight)
  }
}