import parseTimeToString from '../utils/parseTimeToString'
import { $ } from '../utils/utils'

interface Result {
   won: boolean
   score: number
   time: [number, number, number]
}

export default class GameOverScreen {
   $HTMLElement: HTMLElement = null
   isVisible: boolean = false
   constructor() {
      this.$HTMLElement = $('#gameOverScreen') as HTMLElement
   }

   mount(mount: boolean, result?: Result) {
      const $gameResultText = $('#gameResultText')
      const $score = $('#gameOverScore span') as HTMLElement
      const $timer = $('#gameOverTimer span') as HTMLElement

      if (mount) {
         this.$HTMLElement.style.visibility = 'visible'
         if (result.won) {
            $gameResultText.textContent = 'win!'
            $gameResultText.classList.add('win')
         }
         if (!result.won) {
            $gameResultText.textContent = 'lose!'
            $gameResultText.classList.add('lose')
         }

         const hours = parseTimeToString(result.time[0])
         const minutes = parseTimeToString(result.time[1])
         const seconds = parseTimeToString(result.time[2])
         let stringifyTime = `${minutes}:${seconds}`

         if (result.time[0] > 0) stringifyTime = `${hours}:` + stringifyTime

         $score.textContent = `${result.score}`
         $timer.textContent = stringifyTime
      }

      if (!mount) {
         $gameResultText.classList.remove('win')
         $gameResultText.classList.remove('lose')
         $score.textContent = '0'
         $timer.textContent = '00:00'
         this.$HTMLElement.style.visibility = 'hidden'
      }

      this.isVisible = mount
   }

   onSubmit(cb: () => void) {
      const $submitButton = this.$HTMLElement.querySelector('#tryAgainButton')

      new Promise(() => {
         $submitButton.addEventListener('click', cb)
      }).then(() => {
         $submitButton.removeEventListener('click', cb)
      })
   }
}
