import * as THREE from 'three'
import Experience from '../../Experience'
import rotateAroundObject from '../../utils/rotateAroundObject'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

export default class Branches {
  constructor() {
    this.experience = new Experience()

    // Get the things we need from the experience 
    this.scene = this.experience.scene
    this.time = this.experience.time

    // Parameters
    this.cylinderHeight = 5
    
    // Draw
    this.setMaterial()
    this.setMesh()
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      // wireframe: true,
      transparent: true,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
          uFrequency: { value: new THREE.Vector2(5, 5) },
          uTime: { value: 0 },
          uColor: { value: new THREE.Color('purple') } 
      }
    })
  }

  // Generate just one cylider geometry with some randomness
  createRandomCylinder() {
    const cylinerRadiusSmall = 0.002 * Math.random()
    const cylinerRadiusLarge = 0.2 * Math.random()
    const geometry = new THREE.CylinderGeometry(
        cylinerRadiusSmall, cylinerRadiusLarge, this.cylinderHeight, 60, 60, 60
        );
    return geometry
  }

  // Create one mesh for each of the cyliders going in a circle
  createMeshes() {
    const groupCyliners = new THREE.Group();
    for (let i=-Math.PI*0.5; i < Math.PI*0.5; i+=0.005) {
      const geometry = this.createRandomCylinder()
      // Create the corresponding mesh
      const mesh = new THREE.Mesh(geometry, this.material)

      // Make sure each cyliner starts at the center
      mesh.position.x = 0
      mesh.position.y = 0
      mesh.position.z = 0

      // To rotate around the center
      // mesh.rotation.x = i
      // To rotate around the end of the cyliner
      const halfCylinderHeight = this.cylinderHeight * 0.5 
      rotateAroundObject(
          mesh, 
          new THREE.Vector3(0, -halfCylinderHeight, 0), 
          new THREE.Vector3(
              (0.5-Math.random())*2, 
              (0.5-Math.random())*2, 
              (0.5-Math.random())*2
              ), 
          //new THREE.Vector3(1, 0, 1), 
          i
      )
      groupCyliners.add(mesh)
    }
    return groupCyliners
  }

  // Add the whole cylinder group to the scene and do any transforms on the 
  // whole group here
  setMesh() {
    this.mesh = this.createMeshes()
    this.mesh.position.y += 3.5
    this.scene.add(this.mesh)
  }

  // What happens to the branches on animation tick 
  update() {
    this.material.uniforms.uTime.value += this.time.delta * 0.0005
  }
}