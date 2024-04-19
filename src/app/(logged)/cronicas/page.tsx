'use client'

import { NewItemAnchor } from '@/components/NewItemAnchor'
import { ChroniclesItem } from './components/chronicles-item'
import { useQuery } from '@tanstack/react-query'
import { chroniclesServices } from './services'
import { ChorniclesPageSkeleton } from './components/chronicles-page-skeleton'
import { usePagination } from '@/hooks/use-pagination'
import { ChroniclesType, NewsType } from '@/@types/Database'
import { Pagination } from '@/components/common/pagination'

export default function Chronicles() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['chronicles-general'],
    queryFn: async () => {
      const news = await chroniclesServices.index()
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
  } = usePagination<ChroniclesType>(data || [])

  if (error)
    throw new Error('Erro ao buscar crônicas, tente novamente mais tarde')

  if (!data || isLoading) return <ChorniclesPageSkeleton />

  return (
    <>
      <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
        <span className="text-4xl font-bold leading-relaxed md:hidden">
          Notícias
        </span>
        <span className="block text-lg">
          Cadastre, edite ou exclua suas crônicas
        </span>

        <NewItemAnchor />
      </div>

      <div className="mt-8 flex h-full w-full flex-col justify-between">
        <div className="grid w-full grid-cols-1 gap-4  md:grid-cols-2">
          {currentItems.map((item) => (
            <ChroniclesItem {...item} key={item.id} />
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
