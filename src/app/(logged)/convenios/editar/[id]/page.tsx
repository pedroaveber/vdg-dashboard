'use client'

import { CovenantForm } from '../../components/covenant-form'
import { CovenantFormSkeleton } from '../../components/covenant-form-skeleton'
import { useQuery } from '@tanstack/react-query'
import { covenantServices } from '../../services'

type EditCovenantPageProps = {
  params: {
    id: string
  }
}

export default function EditCovenantPage({ params }: EditCovenantPageProps) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['covenant-edit', params.id],
    queryFn: () => covenantServices.get(params.id),
  })

  if (error)
    throw new Error('Erro ao buscar banners, tente novamente mais tarde')

  return (
    <div className="mx-auto my-8 flex w-full max-w-[632px] flex-col">
      {isLoading && <CovenantFormSkeleton />}
      {data && <CovenantForm prevValues={data} />}
    </div>
  )
}
