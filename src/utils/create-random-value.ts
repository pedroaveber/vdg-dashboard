export function createRandomValue() {
  const currentDate = new Date()
  const timestamp = currentDate.getTime()

  const randomValue = Math.floor(Math.random() * 10 ** 6)
  const uniqueValue = `${timestamp}-${randomValue}`

  return uniqueValue
}
