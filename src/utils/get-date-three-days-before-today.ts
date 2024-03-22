export function getDateThreeDaysBeforeToday() {
  const date = new Date()
  const threeDaysBefore = date.setDate(date.getDate() - 3)

  return new Date(threeDaysBefore)
}
