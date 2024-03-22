'use client'

import { NewItemAnchor } from '@/components/NewItemAnchor'
import { CovenantItem } from './components/covenant-item'
import { useQuery } from '@tanstack/react-query'
import { covenantServices } from './services'
import { CovenantPageSkeleton } from './components/covenant-page-skeleton'
import { usePagination } from '@/hooks/use-pagination'
import { CovenantType } from '@/@types/Database'
import { Pagination } from '@/components/common/pagination'

export default function Coventans() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['covenants-general'],
    queryFn: async () => covenantServices.index(),
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
  } = usePagination<CovenantType>(data || [])

  if (error) {
    throw new Error('Erro ao buscar canais, tente novamente mais tarde')
  }

  if (!data || isLoading) return <CovenantPageSkeleton />

  return (
    <>
      <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
        <span className="text-4xl font-bold leading-relaxed md:hidden">
          Convênios
        </span>
        <span className="block text-lg">
          Cadastre, edite ou exclua seus convênios
        </span>

        <NewItemAnchor />
      </div>

      <div className="my-8 flex h-full w-full flex-col justify-between">
        <div className="grid w-full grid-cols-1 gap-4  md:grid-cols-2">
          {currentItems.map((item) => (
            <CovenantItem {...item} key={item.id} />
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
