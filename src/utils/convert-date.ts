export function convertDate(data: string) {
  const date = data.split(' ')
  const [day, month, year] = date[0].split('/')

  return `${year}-${month}-${day}`
}
