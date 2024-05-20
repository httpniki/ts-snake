import { $ } from '../utils/utils'

export default class Score {
   $HTMLElement: HTMLSpanElement = null
   value: number = 0
   constructor() {
      this.$HTMLElement = $('#score-value') as HTMLSpanElement
   }

   private getHTMLValue() {
      const text = this.$HTMLElement.textContent
      const value = Number(text)

      return value
   }

   private setHTMLValue(value: number) {
      this.$HTMLElement.textContent = value.toString()
   }

   increase() {
      const old_value = this.getHTMLValue()
      const newValue = old_value + 1

      this.value = newValue
      this.setHTMLValue(newValue)
   }

   reset() {
      this.value = 0
      this.setHTMLValue(0)
   }
}
