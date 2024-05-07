import './styles/style.css'

import Snake from './components/Snake'
import { keybinds } from './utils/game-keys'
import { $ } from './utils/utils'

class Main {
   $screen: HTMLElement = null
   snake: Snake[] = null

   movementPixelSkip = 20
   timer = null
   speed = 200
   constructor() {
      this.$screen = $('main') as HTMLElement
      this.snake = [new Snake(this.$screen, this.movementPixelSkip)]
      this.init()
   }

   init() {
      document.addEventListener('keyup', (event) => {
         const isGameKey = Object.values(keybinds).includes(event.key)
         if (!isGameKey) return

         this.handleInterval(() => {
            for (let i = 0; i < this.snake.length; i++) {
               const currentSnake = this.snake[i]

               if (event.key === keybinds.right) currentSnake.moveRight()
               if (event.key === keybinds.left) currentSnake.moveLeft()
               if (event.key === keybinds.up) currentSnake.moveUp()
               if (event.key === keybinds.down) currentSnake.moveBottom()
            }
         }, this.speed)
      })
   }

   private handleInterval(cb: (args?: any) => void, time: number) {
      if (this.timer) clearInterval(this.timer)
      this.timer = setInterval(() => {
         cb()
      }, time)
   }
}

new Main()
