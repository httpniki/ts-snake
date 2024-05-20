export default function getRandomPosition(screenSize: number, mash: number) {
   return Math.floor(Math.random() * (screenSize / mash)) * mash
} 
