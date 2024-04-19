import { ChroniclesType } from '@/@types/Database'
import { Services } from '@/infra/services'

export const chroniclesServices = new Services<ChroniclesType>('chronicles')
