import { BannerType } from '@/@types/Database'
import { Services } from '@/infra/services'

export const bannerService = new Services<BannerType>('banners')
