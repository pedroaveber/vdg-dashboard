'use client'

// Hooks
import { useQuery } from '@tanstack/react-query'

// Components
import { SurveyForm } from '../../components/survey-form'

// Services
import { surveyServices } from '../../services'
import { SurveyFormSkeleton } from '../../components/survey-form-skeleton'

interface EditBannerPageProps {
  params: {
    id: string
  }
}

export default function EditBannerPage({ params }: EditBannerPageProps) {
  const { data, error, isLoading } = useQuery({
    queryFn: () => surveyServices.get(params.id),
    queryKey: ['survey-edit', params.id],
  })

  if (!data || isLoading) return <SurveyFormSkeleton />

  if (error) throw new Error('Erro ao buscar enquete')

  return (
    <div className="mx-auto my-8 flex w-full max-w-[632px] flex-col">
      {data && <SurveyForm prevValues={data} />}
    </div>
  )
}
