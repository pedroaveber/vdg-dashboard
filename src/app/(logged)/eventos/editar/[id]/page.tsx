'use client'

// Hooks
import { useQuery } from '@tanstack/react-query'

// Components
import { EventForm } from '../../components/event-form'
import { EventFormSkeleton } from '../../components/event-form-skeleton'

// Services
import { eventServices } from '../../services'

interface EditEventPageProps {
  params: {
    id: string
  }
}

export default function EditEventPage({ params }: EditEventPageProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['event', params.id],
    queryFn: () => eventServices.get(params.id),
  })

  if (error) throw new Error('Erro ao buscar evento')

  if (!data || isLoading) return <EventFormSkeleton />

  return (
    <div className="mx-auto my-8 flex w-full max-w-[632px] flex-col">
      <EventForm prevValues={data} />
    </div>
  )
}
