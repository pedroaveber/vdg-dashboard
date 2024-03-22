'use client'

import { useQuery } from '@tanstack/react-query'
import { SurveyItem } from './components/survey-item'
import { NewItemAnchor } from '@/components/NewItemAnchor'
import { SurveyPageSkeleton } from './components/survey-page-skeleton'
import { surveyServices } from './services'
import { SurveyType } from '@/@types/Database'
import { usePagination } from '@/hooks/use-pagination'
import { Pagination } from '@/components/common/pagination'

export default function Surveys() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['surveys-general'],
    queryFn: () => surveyServices.index(),
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
  } = usePagination<SurveyType>(data || [])

  if (error) throw new Error('Erro ao buscar enquetes')

  if (!data || isLoading) return <SurveyPageSkeleton />

  return (
    <>
      <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
        <span className="text-4xl font-bold leading-relaxed md:hidden">
          Enquetes
        </span>
        <span className="block text-lg">
          Cadastre, edite ou exclua suas enquetes
        </span>

        <NewItemAnchor />
      </div>

      <div className="my-8 flex h-full w-full flex-col justify-between">
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          {currentItems.map((survey) => (
            <SurveyItem key={survey.id} {...survey} />
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
