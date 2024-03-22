'use client'

// Components
import { BannerForm } from '../../components/banner-form'
import { BannerFormSkeleton } from '../../components/banner-form-skeleton'

// Hooks
import { useQuery } from '@tanstack/react-query'

// Services
import { bannerService } from '../../services'

type EditBannerPageProps = {
  params: {
    id: string
  }
}

export default function EditBannerPage({ params }: EditBannerPageProps) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['banner-edit', params.id],
    queryFn: () => bannerService.get(params.id),
  })

  if (error)
    throw new Error('Erro ao buscar banners, tente novamente mais tarde')

  return (
    <div className="mx-auto my-8 flex w-full max-w-[632px] flex-col">
      {isLoading && <BannerFormSkeleton />}
      {data && <BannerForm prevValues={data} />}
    </div>
  )
}
