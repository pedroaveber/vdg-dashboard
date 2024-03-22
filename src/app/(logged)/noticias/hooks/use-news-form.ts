'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { NewsFormSchema } from '../dtos/news-form-schema'
import { createNewsFormSchema } from '../validators/news-form-schema'
import { NewsType } from '@/@types/Database'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { NewsService } from '@/lib/firebase/database/news-service'
import { useUserContext } from '@/contexts/UserContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { newsServices } from '../services'
import { createNewsMapper } from '../mappers'
import { format, parseISO } from 'date-fns'

interface useNewsFormProps {
  prevValues?: NewsType | null
}

export function useNewsForm({ prevValues = null }: useNewsFormProps) {
  const router = useRouter()

  const { currentUser } = useUserContext()
  const queryClient = useQueryClient()

  const { mutateAsync: insertNewsFn } = useMutation({
    mutationFn: async (data: NewsType) => {
      newsServices.create(data)
    },
    onError: () => {
      toast.error('Erro ao salvar notícia')
    },
    onSuccess: () => {
      router.push('/noticias')
      toast.success('Notícia salva com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['news-general'] })
    },
  })

  const { mutateAsync: updateNewsFn } = useMutation({
    mutationFn: async (data: NewsType) => {
      newsServices.update(data)
    },
    onError: () => {
      toast.error('Erro ao salvar notícia')
    },
    onSuccess: () => {
      router.push('/noticias')
      toast.success('Notícia salva com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['news-general'] })
    },
  })

  const defaultValues: NewsFormSchema = {
    link: prevValues?.link || '',
    title: prevValues?.title || '',
    active: prevValues?.active ?? true,
    privacy: prevValues?.privacy || 'PUBLIC',
    imagePath: prevValues?.imagePath || null,
    description: prevValues?.description || '',
    date:
      prevValues && prevValues.date
        ? new Date(parseISO(prevValues.date))
        : new Date(),
  }

  const methods = useForm<NewsFormSchema>({
    resolver: zodResolver(createNewsFormSchema),
    defaultValues,
  })

  async function submitNewsForm(data: NewsFormSchema) {
    if (data.imagePath && typeof data.imagePath !== 'string') {
      if (prevValues?.imagePath) {
        await NewsService.deleteImageFromStorage({
          url: prevValues.imagePath,
        })
      }

      const imagePath = await NewsService.uploadFile({
        file: data.imagePath,
      })

      data.imagePath = imagePath
    }

    prevValues
      ? updateNewsFn({
          ...prevValues,
          ...data,
          date: format(data.date, 'yyyy-MM-dd'),
        })
      : insertNewsFn(
          createNewsMapper(
            {
              ...data,
              date: format(data.date, 'yyyy-MM-dd'),
              imagePath: data.imagePath!,
            },
            {
              id: currentUser!.id,
              name: currentUser!.name,
              avatar: currentUser!.avatar,
            },
          ),
        )
  }

  return {
    ...methods,
    defaultValues,
    submitNewsForm,
  }
}
