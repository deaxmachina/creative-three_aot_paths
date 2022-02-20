import * as THREE from 'three'
import Experience from '../Experience'
import Environment from './Environment'
// import TestCube from './TestCube'
import Branches from './Branches/Branches'
import Trunk from './Trunk/Trunk'
import Stars from './Stars/Stars'
import BranchStrings from './BranchStrings/BranchStrings'

export default class World {
  constructor() {
    this.experience = new Experience()
    // Get things we need from the experience 
    this.scene = this.experience.scene 

    // Setup 
    this.environment = new Environment()

    // Test mesh 
    // this.testCube = new TestCube()

    // Shapes 
    this.branches = new Branches()
    this.trunk = new Trunk()
    this.stars = new Stars()
    //this.branchStrings = new BranchStrings()
    
  }

  update() {
    this.branches.update()
    this.trunk.update()
    //this.branchStrings.update()
  }
}