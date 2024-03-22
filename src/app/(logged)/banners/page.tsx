'use client'

import { useBanner } from './hooks/use-banner'
import { useQuery } from '@tanstack/react-query'
import { BannerItem } from './components/banner-item'
import { NewItemAnchor } from '@/components/NewItemAnchor'
import { BannerPageSkeleton } from './components/banner-page-skeleton'
import { bannerService } from './services'

export default function Banners() {
  const { getHighlightedAmount, highlightedsFirst } = useBanner()

  const { data, error, isLoading } = useQuery({
    queryKey: ['banners-general'],
    queryFn: () => bannerService.index(),
    staleTime: 1000 * 60 * 10, // 10 minute
  })

  if (error)
    throw new Error('Erro ao buscar banners, tente novamente mais tarde')

  if (!data || isLoading) return <BannerPageSkeleton />

  const highlightedBannersQuantity = getHighlightedAmount(data)

  return (
    <>
      <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
        <span className="text-4xl font-bold leading-relaxed md:hidden">
          Banners
        </span>
        <span className="block text-lg">
          Cadastre, edite ou exclua seus banners
        </span>

        {data && data.length < 10 && <NewItemAnchor />}
      </div>

      <div className="mt-8 grid w-full grid-cols-1 gap-4 xl:grid-cols-2">
        {data.sort(highlightedsFirst).map((doc) => (
          <BannerItem
            key={doc.id}
            banner={doc}
            disabled={highlightedBannersQuantity >= 3}
          />
        ))}
      </div>
    </>
  )
}
