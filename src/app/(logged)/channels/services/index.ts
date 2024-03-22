import { ChannelType } from '@/@types/Database'
import { Services } from '@/infra/services'

export const channelServices = new Services<ChannelType>('channels')
