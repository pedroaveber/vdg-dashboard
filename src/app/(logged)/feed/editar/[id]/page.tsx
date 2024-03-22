'use client'

// Components
import { FeedForm } from '../../components/feed-form'
import { FeedFormSkeleton } from '../../components/feed-form-skeleton'

// Hooks
import { useQuery } from '@tanstack/react-query'

// Services
import { feedServices } from '../../services'

interface EditBannerPageProps {
  params: {
    id: string
  }
}

export default function EditBannerPage({ params }: EditBannerPageProps) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['banner-edit', params.id],
    queryFn: () => feedServices.get(params.id),
  })

  if (error) throw new Error('Erro ao buscar feed, tente novamente mais tarde')

  return (
    <div className="mx-auto my-8 flex w-full max-w-[632px] flex-col">
      {isLoading && <FeedFormSkeleton />}
      {data && <FeedForm prevValues={data} publisher={data.author ?? null} />}
    </div>
  )
}
