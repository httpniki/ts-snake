import './styles/style.css'

const $ = (id: string) => document.querySelector(id)
const $$ = (id: string) => document.querySelectorAll(id)

class Snake {
   create() {
      const $snake = document.createElement('div')
      $snake.classList.add('snake')

      return $snake
   }
}

class Main {
   constructor() {
      this.setup()
   }

   setup() {
      const $main = $('main')
      const $snake = new Snake().create()

      $main.appendChild($snake)
      console.log($main.clientWidth, $main.clientHeight)

      document.addEventListener('keydown', (event) => {
         const positionX = $snake.getBoundingClientRect().x
         const positionY = $snake.getBoundingClientRect().y
         const speed = 10
         const clientWidth = $main.clientWidth
         const clientHeight = $main.clientHeight

         function setPosition(x?: number, y?: number) {
            $snake.style.translate = `${x}px ${y}px`
         }

         const rigth = positionX + speed
         const left = positionX - speed
         const up = positionY - speed
         const down = positionY + speed

         switch (event.key) {
            case ('ArrowRight'):
               if (positionX > clientWidth) return setPosition(0, positionY)
               setPosition(rigth, positionY)
               break
            case ('ArrowLeft'):
               if (positionX < 0) return setPosition(clientWidth, positionY)
               setPosition(left, positionY)
               break
            case ('ArrowUp'):
               if (positionY < 0) return setPosition(positionX, clientHeight)
               setPosition(positionX, up)
               break
            case ('ArrowDown'):
               if (positionY > clientHeight) return setPosition(positionX, 0)
               setPosition(positionX, down)
               break
         }

         console.log(event.key, positionX, positionY)
      })
   }
}


new Main()
