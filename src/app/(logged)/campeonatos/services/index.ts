import { LeagueType } from '@/@types/Database'
import { Services } from '@/infra/services'

export const leagueServices = new Services<LeagueType>('channels')
