import { NewsType } from '@/@types/Database'
import { Services } from '@/infra/services'

export const newsServices = new Services<NewsType>('news')
