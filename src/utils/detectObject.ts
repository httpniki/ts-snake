import { Position } from '../types/types'

export default function detectObject(
   clientPosition: Position,
   objectPosition: Position | Position[],
) {
   if (Array.isArray(objectPosition)) {
      return objectPosition.some(el => {
         const checkX = clientPosition.x === el.x
         const checkY = clientPosition.y === el.y

         return (checkX && checkY)
      })
   }

   const checkX = (clientPosition.x === objectPosition.x)
   const checkY = (clientPosition.y === objectPosition.y)

   if (checkX && checkY) return true

   return false
}
