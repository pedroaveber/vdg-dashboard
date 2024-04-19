'use client'

// Components
import { ChroniclesForm } from '../../components/chronicles-form'
import { ChroniclesFormSkeleton } from '../../components/chronicles-form-skeleton'

// Hooks
import { useQuery } from '@tanstack/react-query'

// Services
import { chroniclesServices } from '../../services'

interface EditChroniclesPageProps {
  params: {
    id: string
  }
}

export default function EditChroniclesPage({
  params,
}: EditChroniclesPageProps) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['chronicles-edit', params.id],
    queryFn: () => chroniclesServices.get(params.id),
  })

  if (error)
    throw new Error('Erro ao buscar notícia, tente novamente mais tarde')

  return (
    <div className="mx-auto my-8 flex w-full max-w-[632px] flex-col">
      {isLoading && <ChroniclesFormSkeleton />}
      {data && <ChroniclesForm prevValues={data} />}
    </div>
  )
}
