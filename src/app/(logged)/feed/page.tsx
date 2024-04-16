'use client'

import { FeedItem } from './components/feed-item'
import { NewItemAnchor } from '@/components/NewItemAnchor'
import { FeedPageSkeleton } from './components/feed-page-skeleton'
import { useQuery } from '@tanstack/react-query'
import { feedServices } from './services'
import { FeedType } from '@/@types/Database'
import { usePagination } from '@/hooks/use-pagination'
import { Pagination } from '@/components/common/pagination'
import { convertDate } from '@/utils/convert-date'

export default function Feeds() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['feeds-general'],
    queryFn: async () => {
      const results = await feedServices.index()
      return results.sort((a, b) => {
        const dateA = new Date(convertDate(a.createdAt))
        const dateB = new Date(convertDate(b.createdAt))

        return dateB.getTime() - dateA.getTime()
      })
    },
  })

  const {
    itemsPerPage,
    currentItems,
    currentPage,
    goToFirstPage,
    goToLastPage,
    nextPage,
    pagesAmount,
    prevPage,
  } = usePagination<FeedType>(data || [])

  if (error)
    throw new Error('Erro ao buscar banners, tente novamente mais tarde')

  if (!data || isLoading) return <FeedPageSkeleton />

  return (
    <>
      <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
        <span className="text-4xl font-bold leading-relaxed md:hidden">
          Feed
        </span>
        <span className="block text-lg">
          Cadastre, edite ou exclua seus items do feed
        </span>

        <NewItemAnchor />
      </div>

      <div className="mt-8 flex h-full w-full flex-col justify-between">
        <div className="grid w-full grid-cols-1 gap-4  md:grid-cols-2">
          {currentItems.map((item) => (
            <FeedItem {...item} key={item.id} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          goToFirstPage={goToFirstPage}
          goToLastPage={goToLastPage}
          itemsAmount={data.length}
          itemsPerPage={itemsPerPage}
          nextPage={nextPage}
          pagesAmount={pagesAmount}
          prevPage={prevPage}
        />
      </div>
    </>
  )
}
