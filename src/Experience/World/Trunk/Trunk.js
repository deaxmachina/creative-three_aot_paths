import * as THREE from 'three'
import Experience from '../../Experience'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

export default class Trunk {
  constructor() {
    this.experience = new Experience()
    // Get the things we need from the experience 
    this.scene = this.experience.scene
    this.time = this.experience.time

    // Parameters 
    this.trunkHeight = 5

    // Draw 
    this.setMaterial()
    this.setGeometry()
    this.setMesh()
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
          uFrequency: { value: new THREE.Vector2(10, 5) },
          uTime: { value: 0 },
          uColor: { value: new THREE.Color('purple') } 
      }
    })
  }

  setGeometry() {
    this.geometry = new THREE.CylinderGeometry( 
      0.2, 0.6, this.trunkHeight, 60, 20 
      );
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.position.y -= 1.1;
    this.scene.add(this.mesh)
  }

  // What happens to trunk on animation update 
  update() {
    this.material.uniforms.uTime.value += this.time.delta * 0.001
  }
}