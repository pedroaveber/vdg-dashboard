import { format, parse } from 'date-fns'

interface CreateDateFromNowProps {
  dateFormat?: string | null
}

interface CreateNewDateFromBrazilianFormatProps {
  date: string
}

interface CreateCustomDateProps {
  date: Date
  dateFormat?: string | null
}

export class DateFns {
  public createDateFromNow({ dateFormat = null }: CreateDateFromNowProps) {
    const date = new Date()

    if (dateFormat) {
      return format(date, dateFormat)
    }

    return format(date, 'dd/MM/yyyy HH:mm:ss')
  }

  public createCustomDate({
    date,
    dateFormat = 'dd/MM/yyyy',
  }: CreateCustomDateProps) {
    const formattedDate = format(date, dateFormat!)
    return formattedDate
  }

  public createNewDateFromBrazilianFormat({
    date,
  }: CreateNewDateFromBrazilianFormatProps) {
    const dateWithoutTime = date.split(' ')[0]
    const [day, month, year] = dateWithoutTime.split('/')

    const formattedDate = parse(
      `${year}-${month}-${day}`,
      'yyyy-MM-dd',
      new Date(),
    )

    return formattedDate
  }

  public getSeconds() {
    const seconds = new Date().getTime()
    return seconds
  }
}

export const DateService = new DateFns()
