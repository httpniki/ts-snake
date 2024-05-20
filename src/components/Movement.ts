interface ScreenSize {
   x: number,
   y: number
}

interface CurrentPosition {
   x?: number
   y?: number
}

export default class Movement {
   mash: number
   screenSize: ScreenSize
   currentPosition: CurrentPosition
   private newPositionX: number = null
   private newPositionY: number = null

   constructor(mash: number, screenSize: ScreenSize, position: CurrentPosition) {
      this.mash = mash
      this.screenSize = screenSize
      this.currentPosition = position
   }

   moveUp() {
      const isOverflowScreen = (this.currentPosition.y === 0)

      if (isOverflowScreen) this.newPositionY = this.screenSize.y - this.mash
      if (!isOverflowScreen) this.newPositionY = this.currentPosition.y - this.mash

      return this.newPositionY
   }

   moveDown() {
      const isOverflowScreen = (this.currentPosition.y + this.mash === this.screenSize.y)

      if (isOverflowScreen) this.newPositionY = 0
      if (!isOverflowScreen) this.newPositionY = this.currentPosition.y + this.mash

      return this.newPositionY
   }

   moveRight() {
      const isOverflowScreen = (this.currentPosition.x + this.mash === this.screenSize.x)

      if (isOverflowScreen) this.newPositionX = 0
      if (!isOverflowScreen) this.newPositionX = this.currentPosition.x + this.mash

      return this.newPositionX
   }

   moveLeft() {
      const isOverflowScreen = (this.currentPosition.x === 0)

      if (isOverflowScreen) this.newPositionX = this.screenSize.x - this.mash
      if (!isOverflowScreen) this.newPositionX = this.currentPosition.x - this.mash

      return this.newPositionX
   }
}
