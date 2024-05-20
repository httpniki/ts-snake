import Fruit from './components/Fruit'
import Models from './components/Models'
import Snake from './components/Snake'
import detectObject from './utils/detectObject'
import { keybinds } from './utils/game-keys'
import getRandomPosition from './utils/getRandomPosition'

class Main extends Models {
   speed = 270
   interval = null
   constructor() {
      super({ mash: 20 })
   }

   start() {
      this.director((key: string) => {
         let areFruitPresent = false
         if (this.timer.status === 'Stopped') this.timer.start()
         if (!this.fruit) this.spawnFruit()

         this.snake.map((body, index) => {
            if (index === 0) {
               switch (key) {
                  case (keybinds.right):
                     if (body.direction === 'Left') body.moveByLastDirection()
                     if (body.direction !== 'Left') body.move('Right')
                     break
                  case (keybinds.left):
                     if (body.direction === 'Right') body.moveByLastDirection()
                     if (body.direction !== 'Right') body.move('Left')
                     break
                  case (keybinds.up):
                     if (body.direction === 'Down') body.moveByLastDirection()
                     if (body.direction !== 'Down') body.move('Up')
                     break
                  case (keybinds.down):
                     if (body.direction === 'Up') body.moveByLastDirection()
                     if (body.direction !== 'Up') body.move('Down')
                     break
               }

               areFruitPresent = detectObject(
                  { x: body.x, y: body.y },
                  { x: this.fruit.x, y: this.fruit.y }
               )
            }

            if (index > 0) {
               const prevBody = this.snake[index - 1]
               body.move('', { x: prevBody.old_x, y: prevBody.old_y })
            }

            if (index === this.snake.length - 1) {
               const areBodyPresent = detectObject(
                  { x: this.snake[0].x, y: this.snake[0].y },
                  [...this.snake].slice(3, this.snake.length)
               )

               if (areBodyPresent) this.endGame(false)
               if (areFruitPresent) this.eatFruit()
            }
         })
      }, this.speed)
   }

   private eatFruit() {
      this.score.increase()
      if (this.score.value === 624) return this.endGame(true)
      this.addSnakeBody()
      this.spawnFruit()
   }

   private endGame(won: boolean) {
      clearInterval(this.interval)
      this.timer.stop()

      this.gameOverScreen.mount(true, {
         score: this.score.value,
         time: this.timer.value,
         won
      })

      this.gameOverScreen.onSubmit(() => {
         this.resetModels()
         this.interval = null
         this.gameOverScreen.mount(false)
      })
   }

   private addSnakeBody() {
      const lastSnake = this.snake[this.snake.length - 1]
      const newSnakeBody = new Snake(this.screen, { x: lastSnake.x, y: lastSnake.y })
      this.snake.push(newSnakeBody)
   }

   private spawnFruit() {
      let randomPositionX = getRandomPosition(this.screen.width, this.screen.mash)
      let randomPositionY = getRandomPosition(this.screen.height, this.screen.mash)

      while (this.snake.some(body => randomPositionX === body.x && randomPositionY === body.y)) {
         randomPositionX = getRandomPosition(this.screen.width, this.screen.mash)
         randomPositionY = getRandomPosition(this.screen.height, this.screen.mash)
      }

      if (this.fruit) {
         this.fruit.remove()
         this.fruit = null
      }

      this.fruit = new Fruit({
         x: randomPositionX,
         y: randomPositionY,
         screen: this.screen
      })
   }

   private director(cb: (args?: any) => void, time: number) {
      document.addEventListener('keyup', (event) => {
         const isGameKey = Object.values(keybinds).includes(event.key)

         if (this.gameOverScreen.isVisible) return
         if (!isGameKey) return

         if (this.interval) clearInterval(this.interval)

         this.interval = setInterval(() => cb(event.key), time)
      })
   }
}

new Main().start()
