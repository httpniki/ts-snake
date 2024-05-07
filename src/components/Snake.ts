interface InitialPosition {
   x: number,
   y: number
}

export default class Snake {
   $HTMLElement: HTMLElement = null
   $screen: HTMLElement
   positionX: number
   positionY: number
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
      const newPositionX = x + this.movementPixels

      const isOverflowingScreen = (x > this.$screen.clientWidth)

      if (isOverflowingScreen) this.positionX = 0
      if (!isOverflowingScreen) this.positionX = newPositionX

      return this.renderMovement()
   }

   moveLeft() {
      const { x } = this.$HTMLElement.getBoundingClientRect()
      const newPositionX = (x - this.movementPixels)

      const isOverflowingScreen = (x < 0)

      if (isOverflowingScreen) this.positionX = this.$screen.clientWidth
      if (!isOverflowingScreen) this.positionX = newPositionX

      return this.renderMovement()
   }

   moveUp() {
      const { y } = this.$HTMLElement.getBoundingClientRect()
      const newPositionY = y - this.movementPixels

      const isOverflowingScreen = (y < 0)

      if (isOverflowingScreen) this.positionY = this.$screen.clientHeight
      if (!isOverflowingScreen) this.positionY = newPositionY

      return this.renderMovement()
   }

   moveBottom() {
      const { y } = this.$HTMLElement.getBoundingClientRect()
      const newPositionY = y + this.movementPixels

      const isOverflowingScreen = (y > this.$screen.clientHeight)

      if (isOverflowingScreen) this.positionY = 0
      if (!isOverflowingScreen) this.positionY = newPositionY

      return this.renderMovement()
   }
}
