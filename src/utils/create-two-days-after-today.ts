export function getTwoDaysAfterToday(): Date {
  const today = new Date()
  const twoDaysAfter = new Date(today)

  twoDaysAfter.setDate(today.getDate() + 2)

  return twoDaysAfter
}
