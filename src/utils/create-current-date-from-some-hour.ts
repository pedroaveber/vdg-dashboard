export function createCurrentDateFromSomeHour(time: string) {
  const [hour, minute] = time.split(':')

  const inputHour = new Date()
  inputHour.setHours(Number(hour), Number(minute))

  return inputHour
}
