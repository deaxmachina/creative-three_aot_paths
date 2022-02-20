import * as THREE from 'three'
import Experience from '../Experience'

export default class TestCube {
  constructor() {
    this.experience = new Experience()
    // Get the things we need from the experience 
    this.scene = this.experience.scene 

    // Set the parts of the cube 
    this.setGeometry()
    this.setMaterial()
    this.setMesh()
  }

  setGeometry() {
    this.geometry = new THREE.BoxGeometry(1, 1, 1)
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({})
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }

}