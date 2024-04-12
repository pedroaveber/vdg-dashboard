'use client'

import { NewItemAnchor } from '@/components/NewItemAnchor'
import { NewsItem } from './components/news-item'
import { useQuery } from '@tanstack/react-query'
import { newsServices } from './services'
import { NewsPageSkeleton } from './components/news-page-skeleton'
import { usePagination } from '@/hooks/use-pagination'
import { NewsType } from '@/@types/Database'
import { Pagination } from '@/components/common/pagination'

export default function Banners() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['news-general'],
    queryFn: async () => {
      const news = await newsServices.index()
      return news.sort((a, b) =>
        new Date(a.date.concat('T00:00:00')) >
        new Date(b.date.concat('T00:00:00'))
          ? -1
          : 1,
      )
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
  } = usePagination<NewsType>(data || [])

  if (error)
    throw new Error('Erro ao buscar banners, tente novamente mais tarde')

  if (!data || isLoading) return <NewsPageSkeleton />

  return (
    <>
      <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
        <span className="text-4xl font-bold leading-relaxed md:hidden">
          Notícias
        </span>
        <span className="block text-lg">
          Cadastre, edite ou exclua suas notícias
        </span>

        <NewItemAnchor />
      </div>

      <div className="mt-8 flex h-full w-full flex-col justify-between">
        <div className="grid w-full grid-cols-1 gap-4  md:grid-cols-2">
          {currentItems.map((item) => (
            <NewsItem {...item} key={item.id} />
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
