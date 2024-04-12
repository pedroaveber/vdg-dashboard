'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CurrencyFormatter } from '@/utils/currency-formatter'
import { createEventFormSchema } from '../validators/create-event-form-schema'
import { EventType } from '@/@types/Database'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { EventsService } from '@/lib/firebase/database/events-service'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import type { EventFormSchemaType } from '../dtos/event-form-schema'
import { eventServices } from '../services'
import { createEventMapper, updateEventMapper } from '../mappers'

interface useEventFormProps {
  prevValues?: EventType | null
}

export const useEventForm = ({ prevValues = null }: useEventFormProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutateAsync: updateEventFn } = useMutation({
    mutationFn: async (data: EventType) => {
      await eventServices.update(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events-general'],
      })
      toast.success('Evento atualizado com sucesso!')
      router.push('/eventos')
    },
    onError: () => {
      toast.error('Erro ao atualizar o evento')
    },
  })

  const { mutateAsync: createEventFn } = useMutation({
    mutationFn: async (data: EventType) => {
      await eventServices.create(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events-general'],
      })
      toast.success('Evento criado com sucesso!')
      router.push('/eventos')
    },
    onError: () => {
      toast.error('Erro ao criar o evento')
    },
  })

  const defaultValues: EventFormSchemaType = {
    link: prevValues?.link ?? '',
    hour: prevValues?.hour ?? '',
    city: prevValues?.city ?? '',
    title: prevValues?.title ?? '',
    state: prevValues?.state ?? '',
    local: prevValues?.local ?? '',
    number: prevValues?.number ?? '',
    zipcode: prevValues?.zipcode ?? '',
    address: prevValues?.address ?? '',
    subtitle: prevValues?.subtitle ?? '',
    complement: prevValues?.complement ?? '',
    imagePath: prevValues?.imagePath ?? null,
    description: prevValues?.description ?? '',
    neighborhood: prevValues?.neighborhood ?? '',
    alertMessage: prevValues?.alertMessage ?? '',
    active: prevValues ? prevValues.active : false,
    privacy: prevValues?.privacy ?? 'VIP_MEMBERS_ONLY',
    paymentManagement: prevValues?.paymentManagement ?? false,
    backgroundImagePath: prevValues?.backgroundImagePath ?? null,

    price: prevValues?.price
      ? CurrencyFormatter.formatAsCurrencyFromNumber(prevValues?.price)
      : null,

    date: prevValues?.date
      ? EventsService.DateService.createNewDateFromBrazilianFormat({
          date: prevValues.date,
        })
      : new Date(),

    validity: prevValues?.validity
      ? EventsService.DateService.createNewDateFromBrazilianFormat({
          date: prevValues.validity,
        })
      : new Date(),
  }

  const {
    watch,
    register,
    control,
    setValue,
    setFocus,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventFormSchemaType>({
    resolver: zodResolver(createEventFormSchema),
    defaultValues,
  })

  async function submitEventForm(data: EventFormSchemaType) {
    if (data.imagePath && typeof data.imagePath !== 'string') {
      if (prevValues?.imagePath) {
        await EventsService.deleteImageFromStorage({
          url: prevValues.imagePath,
        })
      }

      const imagePath = await EventsService.uploadFile({
        file: data.imagePath,
      })

      data.imagePath = imagePath
    }

    if (
      data.backgroundImagePath &&
      typeof data.backgroundImagePath !== 'string'
    ) {
      if (prevValues?.backgroundImagePath) {
        await EventsService.deleteImageFromStorage({
          url: prevValues.backgroundImagePath,
        })
      }

      const imagePath = await EventsService.uploadFile({
        file: data.backgroundImagePath,
      })

      data.backgroundImagePath = imagePath
    }

    prevValues
      ? updateEventFn(
          updateEventMapper({
            ...prevValues,
            ...data,
            price: data.price,
          }),
        )
      : createEventFn(
          createEventMapper({
            ...data,
            imagePath: data.imagePath!,
            backgroundImagePath: data.backgroundImagePath!,
          }),
        )
  }

  return {
    watch,
    errors,
    control,
    setValue,
    setFocus,
    register,
    handleSubmit,
    isSubmitting,
    defaultValues,
    submitEventForm,
  }
}
