import * as THREE from 'three'
import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter {
  constructor() {
    super()
    // Setup 
    this.start = Date.now()
    this.current = this.start
    this.elapsed = 0
    this.delta = 16 // for 16 fps 
    // so that we don't call the animation frame immediately 
    // but wait one frame; otherwise could have done this.tick() only
    window.requestAnimationFrame(() => {
      this.tick()
    })
  }
  tick() {
    const currentTime = Date.now()
    this.delta = currentTime - this.current
    this.current = currentTime
    this.elapsed = this.current - this.elapsed

    this.trigger('tick')

    window.requestAnimationFrame(() => {
      this.tick()
    })
  }
}