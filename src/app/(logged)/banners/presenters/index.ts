import type { BannerType } from '@/@types/Database'

export function getAllBannersPresenter(data: BannerType) {
  return {
    id: data.id,
    title: data.title,
    highlighted: data.highlighted,
    imagePath: data.imagePath,
    active: data.active,
  }
}
