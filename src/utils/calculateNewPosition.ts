type PositionX = {
   screenWidth: number
   positionX: number
}

type PositionY = {
   screenHeight: number
   positionY: number
}

interface Arguments {
   pixelsToMove: number
   left?: PositionX
   right?: PositionX
   up?: PositionY
   down?: PositionY
}

type Position = number
type Direction = 'Up' | 'Left' | 'Right' | 'Down'

export default function calculateNewPosition({
   pixelsToMove,
   right,
   left,
   up,
   down
}: Arguments) {
   let direction: Direction = null
   let position: Position = null

   if (right) {
      direction = 'Right'
      const isOverflowingScreen = (right.positionX > right.screenWidth)

      if (isOverflowingScreen) position = 0
      if (!isOverflowingScreen) position = right.positionX + pixelsToMove
   }

   if (left) {
      direction = 'Left'
      const isOverflowingScreen = (left.positionX < 0)

      if (isOverflowingScreen) position = left.screenWidth
      if (!isOverflowingScreen) position = left.positionX - pixelsToMove
   }

   if (up) {
      direction = 'Up'
      const isOverflowingScreen = (up.positionY < 0)

      if (isOverflowingScreen) position = up.screenHeight
      if (!isOverflowingScreen) position = up.positionY - pixelsToMove
   }

   if (down) {
      direction = 'Down'
      const isOverflowingScreen = (down.positionY > down.screenHeight)

      if (isOverflowingScreen) position = 0
      if (!isOverflowingScreen) position = down.positionY + pixelsToMove
   }

   if (!direction) throw new Error('Direction is not provided')
   if (position === null) throw new Error(`Error moving to ${direction}`)

   return position
}
