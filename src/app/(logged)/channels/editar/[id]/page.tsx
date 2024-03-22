'use client'

// Hooks
import { useQuery } from '@tanstack/react-query'

// Components
import { ChannelForm } from '../../components/channel-form'
import { ChannelFormSkeleton } from '../../components/channel-form-skeleton'

// Services
import { channelServices } from '../../services'

interface NewChannelParams {
  params: {
    id: string
  }
}

export default function NewChannel({ params }: NewChannelParams) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['banner-edit', params.id],
    queryFn: () => channelServices.get(params.id),
  })

  if (error)
    throw new Error('Erro ao buscar banners, tente novamente mais tarde')

  return (
    <div className="mx-auto my-8 flex w-full max-w-[632px] flex-col">
      {isLoading && <ChannelFormSkeleton />}
      {data && <ChannelForm channel={data} />}
    </div>
  )
}
