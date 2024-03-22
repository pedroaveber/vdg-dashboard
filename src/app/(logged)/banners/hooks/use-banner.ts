import { BannerType } from '@/@types/Database'
import { GetAllBannersResponseDTO } from '../dtos'

export const useBanner = () => {
  function highlightedsFirst(
    a: GetAllBannersResponseDTO,
    b: GetAllBannersResponseDTO,
  ) {
    if (a.highlighted && !b.highlighted) return -1
    if (!a.highlighted && b.highlighted) return 1
    return 0
  }

  function getHighlightedAmount(banners: BannerType[]) {
    const highlightedBannersQuantity = banners.filter(
      (doc) => doc.highlighted,
    ).length

    return highlightedBannersQuantity
  }

  return {
    highlightedsFirst,
    getHighlightedAmount,
  }
}
