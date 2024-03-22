export function useMasks() {
  function createCepMask(cep: string | null | undefined): string | null {
    if (!cep) return null

    if (cep.length <= 5) return cep.replace(/(\d{5})/, '$1-')

    return cep.replace(/(\d{5})(\d{3})/, '$1-$2')
  }

  function createDateMask(date: string | null | undefined): string | null {
    if (!date) return null

    if (date.length <= 2) return date.replace(/(\d{2})/, '$1/')

    if (date.length <= 5) return date.replace(/(\d{2})(\d{2})/, '$1/$2/')

    return date.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')
  }

  function createHourMask(hour: string | null | undefined): string | null {
    if (!hour) return null

    if (hour.length <= 2) return hour.replace(/(\d{2})/, '$1:')

    return hour.replace(/(\d{2})(\d{2})/, '$1:$2')
  }

  return {
    createCepMask,
    createDateMask,
    createHourMask,
  }
}
