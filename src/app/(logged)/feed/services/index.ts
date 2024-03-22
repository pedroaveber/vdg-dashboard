import { FeedType } from '@/@types/Database'
import { Services } from '@/infra/services'

export const feedServices = new Services<FeedType>('feeds')
