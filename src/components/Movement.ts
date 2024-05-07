interface Arguments {
   $element: HTMLElement
   $screen: HTMLElement
   movementPixelSkip: number
}

export default class Movement {
   $element: HTMLElement
   $screen: HTMLElement
   movementPixelSkip: number
   x: number
   y: number
   constructor({ $element, $screen, movementPixelSkip }: Arguments) {
      this.$element = $element
      this.movementPixelSkip = movementPixelSkip
      this.$screen = $screen
      const { x, y } = $element.getBoundingClientRect()
      this.x = x
      this.y = y
   }

   translateRight() {
      const rigth = this.x + this.movementPixelSkip
      const isOverflowingScreen = this.y > this.$screen.clientWidth

      if (isOverflowingScreen) return this.translate(0, this.y)
      return this.translate(rigth, this.y)
   }

   translateLeft() {
      const left = this.x - this.movementPixelSkip
      const isOverflowingScreen = this.y < 0

      if (isOverflowingScreen) return this.translate(this.$screen.clientWidth, this.y)
      return this.translate(left, this.y)
   }

   translateTop() {
      const up = this.y - this.movementPixelSkip
      const isOverflowingScreen = this.y < 0

      if (isOverflowingScreen) return this.translate(this.x, this.$screen.clientHeight)
      return this.translate(this.x, up)
   }

   translateBottom() {
      const down = this.y + this.movementPixelSkip
      const isOverflowingScreen = this.y > this.$screen.clientHeight

      if (isOverflowingScreen) return this.translate(this.x, 0)
      return this.translate(this.x, down)
   }

   translate(x?: number, y?: number) {
      this.$element.style.translate = `${x}px ${y}px`
   }
}
