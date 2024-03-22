export class CurrencyFormatter {
  public static formatAsCurrencyFromString(value: string) {
    const formattedValue = value.replace(',', '.').trim()
    return Number(formattedValue)
  }

  public static formatAsCurrencyFromNumber(value: number) {
    return value.toFixed(2).replace('.', ',')
  }
}
