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
      const isOutOfView = (this.currentPosition.y === 0)

      if (isOutOfView) this.newPositionY = this.screenSize.y - this.mash
      if (!isOutOfView) this.newPositionY = this.currentPosition.y - this.mash

      return this.newPositionY
   }

   moveDown() {
      const isOutOfView = (this.currentPosition.y + this.mash === this.screenSize.y)

      if (isOutOfView) this.newPositionY = 0
      if (!isOutOfView) this.newPositionY = this.currentPosition.y + this.mash

      return this.newPositionY
   }

   moveRight() {
      const isOutOfView = (this.currentPosition.x + this.mash === this.screenSize.x)

      if (isOutOfView) this.newPositionX = 0
      if (!isOutOfView) this.newPositionX = this.currentPosition.x + this.mash

      return this.newPositionX
   }

   moveLeft() {
      const isOutOfView = (this.currentPosition.x === 0)

      if (isOutOfView) this.newPositionX = this.screenSize.x - this.mash
      if (!isOutOfView) this.newPositionX = this.currentPosition.x - this.mash

      return this.newPositionX
   }
}
