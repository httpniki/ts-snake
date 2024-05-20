import Screen from './Screen'

interface Arguments {
   x: number
   y: number
   screen: Screen
}

export default class Fruit {
   $HTMLElement: HTMLElement = null
   private screen: Screen
   x: number
   y: number
   constructor({ x, y, screen }: Arguments) {
      this.screen = screen
      this.x = x
      this.y = y
      this.create()
   }

   create() {
      const $fruit = document.createElement('div')

      $fruit.classList.add('fruit')
      $fruit.style.top = `${this.y}px`
      $fruit.style.left = `${this.x}px`

      this.$HTMLElement = $fruit
      this.screen.$HTMLElement.appendChild($fruit)
   }

   remove() {
      this.screen.$HTMLElement.removeChild(this.$HTMLElement)
   }
}
