export type Direction = '' | 'Right' | 'Left' | 'Up' | 'Down'

export interface Position {
   x: number
   y: number
}

interface SnakeAction {
   position: Position
}
