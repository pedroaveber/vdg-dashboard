import { parse } from 'date-fns'

export function createDate(date: string) {
  const dateWithoutTime = date.split(' ')[0]
  const [day, month, year] = dateWithoutTime.split('/')

  const formattedDate = parse(
    `${year}-${month}-${day}`,
    'yyyy-MM-dd',
    new Date(),
  )

  return formattedDate
}
