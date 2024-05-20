export default function parseTimeToString(time: number) {
   if (time.toString().length === 1) return `0${time}`

   return `${time}`
}
