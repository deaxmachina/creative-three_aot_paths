import * as THREE from 'three'
import Experience from '../../Experience'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

export default class Stars {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.renderer = this.experience.renderer
    console.log('the stars were created')

    // Parameters
    this.parameters = {}
    this.parameters.count = 100000
    this.parameters.size = 0.007
    this.parameters.radius = 5
    this.parameters.randomness = 0.5

    this.geometry = null
    this.material = null
    this.points = null

    // Draw
    this.generateStars()
  }

  setGeometry() {
    this.geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(this.parameters.count * 3)
    const scales = new Float32Array(this.parameters.count * 1)

    for (let i = 0; i < this.parameters.count; i++) {
        const i3 = i * 3
        // Position
        const radius = Math.random() * this.parameters.radius
        positions[i3    ] = (0.5 - Math.random())*15
        //positions[i3 + 1] = (0.5 - Math.random())*13
        positions[i3 + 1] = (0.85 - Math.random())*15
        positions[i3 + 2] = (0.5 - Math.random())*10

        // Scale
        scales[i] = Math.random()
    }

    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    this.geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
          uSize: { value: 30 * this.renderer.instance.getPixelRatio() }
      }
    })
  }

  // Equivalent to setMesh
  generateStars() {
    if (this.points !== null) {
        this.geometry.dispose()
        this.material.dispose()
        this.scene.remove(points)
      }
    this.setGeometry()
    this.setMaterial()
    // Points 
    this.points = new THREE.Points(this.geometry, this.material)
    this.scene.add(this.points)
  }

}