'use client'

// Components
import { NewsForm } from '../../components/news-form'
import { NewsFormSkeleton } from '../../components/news-form-skeleton'

// Hooks
import { useQuery } from '@tanstack/react-query'

// Services
import { newsServices } from '../../services'

interface EditBannerPageProps {
  params: {
    id: string
  }
}

export default function EditBannerPage({ params }: EditBannerPageProps) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['news-edit', params.id],
    queryFn: () => newsServices.get(params.id),
  })

  if (error)
    throw new Error('Erro ao buscar notícia, tente novamente mais tarde')

  return (
    <div className="mx-auto my-8 flex w-full max-w-[632px] flex-col">
      {isLoading && <NewsFormSkeleton />}
      {data && <NewsForm prevValues={data} publisher={data.author ?? null} />}
    </div>
  )
}
