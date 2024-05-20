import parseTimeToString from '../utils/parseTimeToString'
import { $ } from '../utils/utils'

type Status = 'Stopped' | 'Running'

export default class Timer {
   $minutes: HTMLSpanElement = null
   $seconds: HTMLSpanElement = null
   $hours: HTMLSpanElement = null
   status: Status = 'Stopped'
   value: [number, number, number]
   timer = null
   constructor() {
      this.$seconds = $('#timer .seconds') as HTMLSpanElement
      this.$minutes = $('#timer .minutes') as HTMLSpanElement
      this.$hours = $('#timer .hours') as HTMLSpanElement
   }

   private setHTMLTime(hours: number, minutes: number, seconds: number) {
      this.$hours.textContent = parseTimeToString(hours)
      this.$minutes.textContent = parseTimeToString(minutes)
      this.$seconds.textContent = parseTimeToString(seconds)

      const hoursDivider = $('.hours-divider') as HTMLSpanElement
      if (hours > 0) this.$hours.style.display = 'inline'
      if (hours > 0) hoursDivider.style.display = 'inline'
   }

   start() {
      let seconds = 0
      let minutes = 0
      let hours = 0

      this.timer = setInterval(() => {
         seconds = seconds + 1

         if (seconds === 59) {
            minutes = minutes + 1
            seconds = 0
         }

         if (minutes === 59) {
            hours = hours + 1
            minutes = 0
            seconds = 0
         }

         this.setHTMLTime(hours, minutes, seconds)
         this.value = [hours, minutes, seconds]
      }, 1000)

      this.status = 'Running'
   }

   stop() {
      clearTimeout(this.timer)
      this.status = 'Stopped'
   }

   reset() {
      this.setHTMLTime(0, 0, 0)
      this.value = [0, 0, 0]
   }
}
