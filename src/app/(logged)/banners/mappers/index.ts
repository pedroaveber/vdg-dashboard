// Utils
import { format } from 'date-fns'
import { v4 as uuid } from 'uuid'

// Types
import { Optional } from '@/@types/Optional'
import type { BannerType } from '@/@types/Database'
import { BannerFormSchemaType } from '../dtos/banner-form-schema'

export function createBannerMapper(data: BannerFormSchemaType): BannerType {
  const banner: BannerType = {
    active: data.active,
    createdAt: format(new Date(), 'dd/MM/yyyy'),
    highlighted: false,
    id: uuid(),
    imagePath: data.imagePath,
    link: data.link,
    title: data.title,
    timestamp: new Date().getTime(),
  }

  return banner
}
