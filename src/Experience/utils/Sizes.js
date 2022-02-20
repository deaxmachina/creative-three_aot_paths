import EventEmitter from './EventEmitter'

export default class Sizes extends EventEmitter {
  constructor() {
    super()
    // Setup 
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)

    // Resize event 
    // Attach an event emitter for a resize event 
    // This will be the only place where we listen for resize
    window.addEventListener('resize', () => {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.pixelRatio = Math.min(window.devicePixelRatio)
      this.trigger('resizeHappened')
    })
  }
}