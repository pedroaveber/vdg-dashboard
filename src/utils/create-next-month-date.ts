export function createNextMonthDate() {
  const today = new Date()
  const nextMonth = new Date(today)

  nextMonth.setMonth(today.getMonth() + 1)

  return nextMonth
}
