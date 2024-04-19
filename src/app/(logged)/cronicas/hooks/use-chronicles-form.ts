'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ChroniclesTypeFormSchema } from '../dtos/chronicles-form-schema'
import { createChroniclesFormSchema } from '../validators/chronicles-form-schema'
import { ChroniclesType } from '@/@types/Database'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { chroniclesServices } from '../services'
import { createChroniclesMapper } from '../mappers'
import { format, parseISO } from 'date-fns'

interface UseChroniclesFormProps {
  prevValues?: ChroniclesType | null
}

export function useChroniclesForm({
  prevValues = null,
}: UseChroniclesFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutateAsync: insertChroniclesFn } = useMutation({
    mutationFn: async (data: ChroniclesType) => {
      chroniclesServices.create(data)
    },
    onError: () => {
      toast.error('Erro ao salvar notícia')
    },
    onSuccess: () => {
      router.push('/cronicas')
      toast.success('Crônica salva com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['chronicles-general'] })
    },
  })

  const { mutateAsync: updateChroniclesFn } = useMutation({
    mutationFn: async (data: ChroniclesType) => {
      chroniclesServices.update(data)
    },
    onError: () => {
      toast.error('Erro ao salvar crônica')
    },
    onSuccess: () => {
      router.push('/cronicas')
      toast.success('Crônica salva com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['chronicles-general'] })
    },
  })

  const defaultValues: ChroniclesTypeFormSchema = {
    active: prevValues?.active ?? false,
    author: prevValues?.author || '',
    date: prevValues ? parseISO(prevValues.date) : new Date(),
    content: prevValues?.content || '',
    title: prevValues?.title || '',
    authorship: prevValues?.authorship || '',
  }

  const methods = useForm<ChroniclesTypeFormSchema>({
    resolver: zodResolver(createChroniclesFormSchema),
    defaultValues,
  })

  async function submitChorniclesForm(data: ChroniclesTypeFormSchema) {
    prevValues
      ? updateChroniclesFn({
          ...prevValues,
          ...data,
          date: format(data.date, 'yyyy-MM-dd'),
        })
      : insertChroniclesFn(
          createChroniclesMapper({
            ...data,
            date: format(data.date, 'yyyy-MM-dd'),
          }),
        )
  }

  return {
    ...methods,
    defaultValues,
    submitChorniclesForm,
  }
}
