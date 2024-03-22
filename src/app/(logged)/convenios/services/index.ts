import { CovenantType } from '@/@types/Database'
import { Services } from '@/infra/services'

export const covenantServices = new Services<CovenantType>('covenants')
