'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import type { SurveyType } from '@/@types/Database'
import type { SurveyFormSchema } from '../dtos/survey-form.schema'
import { createSurveyFormSchema } from '../validators/survey-form-schema'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import { createDate } from '@/utils/create-date'
import { createSurveyMapper } from '../mappers'
import { surveyServices } from '../services'

interface useSurveyFormProps {
  prevValues?: SurveyType | null
}

export const useSurveyForm = ({ prevValues = null }: useSurveyFormProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutateAsync: insertSurveyFn } = useMutation({
    mutationFn: async (data: SurveyType) => {
      await surveyServices.create(data)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['surveys-general'] })
      toast.success('Enquete salva com sucesso!')
      router.push('/enquetes')
    },
    onError: () => {
      toast.error('Erro ao salvar enquete!')
    },
  })

  const { mutateAsync: updateSurveyFn } = useMutation({
    mutationFn: async (data: SurveyType) => {
      await surveyServices.update(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['surveys-general'],
      })
      toast.success('Enquete atualizada com sucesso!')
      router.push('/enquetes')
    },
    onError: () => {
      toast.error('Erro ao atualizar enquete!')
    },
  })

  const initialOptions = [
    {
      value: '',
      votes: 0,
    },
    {
      value: '',
      votes: 0,
    },
  ]

  const defaultValues: SurveyFormSchema = {
    options: prevValues?.options || initialOptions,
    question: prevValues?.question || '',
    privacy: prevValues?.privacy || 'PUBLIC',
    validityHour: prevValues?.validityHour || '',
    active: prevValues ? prevValues.active : false,
    associateFootball: prevValues ? prevValues.associateFootball : false,
    associatedMatchId: prevValues?.associatedMatchId || null,
    validityDate: prevValues?.validityDate
      ? createDate(prevValues.validityDate)
      : new Date(),
  }

  const methods = useForm<SurveyFormSchema>({
    resolver: zodResolver(createSurveyFormSchema),
    defaultValues,
  })

  async function saveAndPublishSurvey(data: SurveyFormSchema) {
    data.options = data.options.filter((item) => item.value !== '')

    prevValues
      ? updateSurveyFn({
          ...prevValues,
          ...data,
          active: true,
          validityDate: format(data.validityDate, 'dd/MM/yyyy'),
        })
      : insertSurveyFn(
          createSurveyMapper({
            ...data,
            active: true,
          }),
        )
  }

  async function saveSurvey(data: SurveyFormSchema) {
    data.options = data.options.filter((item) => item.value !== '')

    prevValues
      ? updateSurveyFn({
          ...prevValues,
          ...data,
          active: false,
          validityDate: format(data.validityDate, 'dd/MM/yyyy'),
        })
      : insertSurveyFn(
          createSurveyMapper({
            ...data,
            active: false,
          }),
        )
  }

  return {
    ...methods,
    saveSurvey,
    defaultValues,
    saveAndPublishSurvey,
  }
}
