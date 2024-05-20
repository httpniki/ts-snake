import { Direction } from '~/types/types'

import Movement from './Movement'
import Screen from './Screen'

interface Position {
   x: number,
   y: number
}

export default class Snake {
   $HTMLElement: HTMLElement = null
   screen: Screen
   x: number
   y: number
   old_x: number
   old_y: number
   direction: Direction = ''
   constructor(screen: Screen, initialPosition?: Position) {
      this.screen = screen
      this.create(initialPosition)
   }

   private create(initialPosition?: Position) {
      const $snake = document.createElement('div')

      $snake.classList.add('snake')
      $snake.style.visibility = 'hidden'

      this.$HTMLElement = $snake
      this.screen.$HTMLElement.appendChild($snake)

      const x = initialPosition?.x ?? this.$HTMLElement.offsetLeft
      const y = initialPosition?.y ?? this.$HTMLElement.offsetTop

      this.setHTMLElementPosition(x, y)
      this.x = x
      this.y = y

      this.$HTMLElement.style.visibility = 'visible'
   }

   move(direction: Direction, pos?: Position) {
      const { x, y } = pos ?? {}
      this.old_x = this.x
      this.old_y = this.y

      if (direction) {
         const movement = new Movement(
            this.screen.mash,
            { x: this.screen.width, y: this.screen.height },
            { x: this.x, y: this.y }
         )

         switch (direction) {
            case ('Up'):
               this.y = movement.moveUp()
               break
            case ('Down'):
               this.y = movement.moveDown()
               break
            case ('Right'):
               this.x = movement.moveRight()
               break
            case ('Left'):
               this.x = movement.moveLeft()
               break
         }
      }

      if (typeof x === 'number') this.x = x
      if (typeof y === 'number') this.y = y

      this.direction = direction
      this.setHTMLElementPosition(this.x, this.y)
   }

   moveByLastDirection() {
      this.old_x = this.x
      this.old_y = this.y

      if (this.direction === 'Left') this.move('Left')
      if (this.direction === 'Right') this.move('Right')
      if (this.direction === 'Up') this.move('Up')
      if (this.direction === 'Down') this.move('Down')
   }

   private setHTMLElementPosition(x: number, y: number) {
      this.$HTMLElement.style.left = `${x}px`
      this.$HTMLElement.style.top = `${y}px`
   }
}
