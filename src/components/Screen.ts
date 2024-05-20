import { $ } from '../utils/utils'

export default class Screen {
   $HTMLElement: HTMLElement
   width: number
   height: number
   mash: number
   constructor(mash: number) {
      this.$HTMLElement = $('#game') as HTMLElement
      this.width = this.$HTMLElement.clientWidth
      this.height = this.$HTMLElement.clientHeight
      this.mash = mash
   }
}
