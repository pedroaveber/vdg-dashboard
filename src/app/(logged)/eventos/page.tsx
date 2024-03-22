'use client'

import { useQuery } from '@tanstack/react-query'
import { EventItem } from './components/event-item'
import { NewItemAnchor } from '@/components/NewItemAnchor'
import { EventPageSkeleton } from './components/event-page-skeleton'
import { eventServices } from './services'
import { EventType } from '@/@types/Database'
import { usePagination } from '@/hooks/use-pagination'
import { Pagination } from '@/components/common/pagination'

export default function Events() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['events-general'],
    queryFn: () => eventServices.index(),
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
  } = usePagination<EventType>(data || [])

  if (error) throw new Error('Erro ao buscar eventos')

  if (!data || isLoading) return <EventPageSkeleton />

  return (
    <>
      <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
        <span className="text-4xl font-bold leading-relaxed md:hidden">
          Eventos
        </span>
        <span className="block text-lg">
          Cadastre, edite ou exclua seus eventos
        </span>

        <NewItemAnchor />
      </div>

      <div className="my-8 flex h-full w-full flex-col justify-between">
        <div className="grid w-full grid-cols-1 gap-4  md:grid-cols-2">
          {currentItems.map((item) => (
            <EventItem {...item} key={item.id} />
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
