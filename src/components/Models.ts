import { $$ } from '../utils/utils'
import Fruit from './Fruit'
import GameOverScreen from './GameOverScreen'
import Score from './Score'
import Screen from './Screen'
import Snake from './Snake'
import Timer from './Timer'

interface Arguments {
   mash: number
}

export default class Models {
   gameOverScreen: GameOverScreen
   snake: Snake[] = []
   screen: Screen
   fruit: Fruit = null
   timer: Timer
   score: Score
   constructor({ mash }: Arguments) {
      this.screen = new Screen(mash)
      this.gameOverScreen = new GameOverScreen()
      this.score = new Score()
      this.timer = new Timer()
      this.snake = [new Snake(this.screen)]
   }

   resetModels() {
      this.resetSnake()
      this.fruit.remove()
      this.fruit = null
      this.score.reset()
      this.timer.reset()
   }

   private resetSnake() {
      const snake = $$('.snake')

      snake.forEach((body: HTMLElement) => {
         if (!body) return
         this.screen.$HTMLElement.removeChild(body)
      })

      this.snake = [new Snake(this.screen)]
   }
}
