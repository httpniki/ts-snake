import calculateNewPosition from '../utils/calculateNewPosition'

interface InitialPosition {
   x: number,
   y: number
}

export default class Snake {
   $HTMLElement: HTMLElement = null
   $screen: HTMLElement
   positionX: number
   positionY: number
   prevPositionX: number = null
   prevPositionY: number = null
   movementPixels: number
   constructor(
      $screen: HTMLElement,
      movementPixels: number,
      initialPosition?: InitialPosition
   ) {
      this.$screen = $screen
      this.movementPixels = movementPixels
      this.create()

      const { x, y } = this.$HTMLElement.getBoundingClientRect()
      this.positionX = initialPosition?.x ?? x
      this.positionY = initialPosition?.y ?? y
   }

   private create() {
      const $snake = document.createElement('div')
      $snake.classList.add('snake')

      this.$HTMLElement = $snake
      this.$screen.appendChild(this.$HTMLElement)
   }

   private renderMovement() {
      this.$HTMLElement.style.translate = `${this.positionX}px ${this.positionY}px`
   }

   moveRight() {
      const { x } = this.$HTMLElement.getBoundingClientRect()

      const newPosition = calculateNewPosition({
         pixelsToMove: this.movementPixels,
         right: {
            screenWidth: this.$screen.clientWidth,
            positionX: x
         }
      })

      this.prevPositionX = this.positionX
      this.positionX = newPosition

      return this.renderMovement()
   }

   moveLeft() {
      const { x } = this.$HTMLElement.getBoundingClientRect()

      const newPosition = calculateNewPosition({
         pixelsToMove: this.movementPixels,
         left: {
            screenWidth: this.$screen.clientWidth,
            positionX: x
         }
      })

      this.prevPositionX = this.positionX
      this.positionX = newPosition

      return this.renderMovement()
   }

   moveUp() {
      const { y } = this.$HTMLElement.getBoundingClientRect()
      const newPositionY = calculateNewPosition({
         pixelsToMove: this.movementPixels,
         up: {
            positionY: y,
            screenHeight: this.$screen.clientHeight
         }
      })

      this.prevPositionY = this.positionY
      this.positionY = newPositionY

      return this.renderMovement()
   }

   moveBottom() {
      const { y } = this.$HTMLElement.getBoundingClientRect()
      const newPositionY = calculateNewPosition({
         pixelsToMove: this.movementPixels,
         down: {
            positionY: y,
            screenHeight: this.$screen.clientHeight
         }
      })

      this.prevPositionY = this.positionY
      this.positionY = newPositionY

      return this.renderMovement()
   }
}
