import { EventType } from '@/@types/Database'
import { Services } from '@/infra/services'

export const eventServices = new Services<EventType>('events')
