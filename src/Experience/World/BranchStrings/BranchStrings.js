import * as THREE from 'three'
import Experience from '../../Experience'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import rotateAroundObject from '../../utils/rotateAroundObject'

export default class BranchStrings {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.time = this.experience.time

    // Parameters
    this.cylinerHeight = 4
    this.cylinerRadiusSmall = 0.002
    this.cylinerRadiusLarge = 0.007

    // Draw
    this.setMaterial()
    this.setGeometry()
    this.setMeshes()
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
        this.cylinerRadiusSmall, 
        this.cylinerRadiusLarge, 
        this.cylinerHeight, 10, 50, 10
    );
  }

  setMeshes() {
    this.mesh = new THREE.Group();
    for (let i=-Math.PI*0.5; i < Math.PI*0.5; i+=0.05) {
      // Create a mesh with the same geometry and material
      const mesh = new THREE.Mesh(this.geometry, this.material)
      // Make sure each cyliner starts at the center
      mesh.position.x = 0
      mesh.position.y = 0
      mesh.position.z = 0
      // To rotate around the end of the cyliner
      const halfCylinerLength = this.cylinerHeight * 0.5 
      rotateAroundObject(
          mesh, 
          new THREE.Vector3(0, -halfCylinerLength, 0), 
          new THREE.Vector3(
              (0.5-Math.random())*2, 
              (0.5-Math.random())*2, 
              (0.5-Math.random())*2
              ), 
          //new THREE.Vector3(0, 0, 1), 
          i
      )
      this.mesh.add(mesh)  
    }
    this.mesh.position.y += 3
    this.scene.add(this.mesh);
  }

  update() {
    this.material.uniforms.uTime.value += this.time.delta * 0.001
  }

}