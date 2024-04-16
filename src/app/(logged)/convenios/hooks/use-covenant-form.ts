'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { CovenantFormSchemaType } from '../dtos/covenant-form-schema'
import { createCovenantFormSchema } from '../validators/covenant-form-schema'
import { CovenantType } from '@/@types/Database'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { CovenantsService } from '@/lib/firebase/database/covenants-service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { covenantServices } from '../services'
import { createCovenantMapper } from '../mappers'

interface useCovenantFormProps {
  prevValues?: CovenantType | null
}

export function useCovenantForm({ prevValues = null }: useCovenantFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutateAsync: insertCovenantFn } = useMutation({
    mutationFn: async (data: CovenantType) => {
      covenantServices.create(data)
    },
    onError: () => {
      toast.error('Erro ao salvar o convênio')
    },
    onSuccess: () => {
      router.push('/convenios')
      toast.success('Convênio salvo com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['covenants-general'] })
    },
  })

  const { mutateAsync: updateCovenantFn } = useMutation({
    mutationFn: async (data: CovenantType) => {
      covenantServices.update(data)
    },
    onError: () => {
      toast.error('Erro ao atualizar o convênio')
    },
    onSuccess: () => {
      router.push('/convenios')
      toast.success('Convênio atualizado com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['covenants-general'] })
    },
  })

  const defaultValues = {
    link: prevValues?.link || '',
    title: prevValues?.title || '',
    qrCode: prevValues?.qrCode || '',
    active: prevValues?.active || true,
    logoPath: prevValues?.logoPath || null,
    imagePath: prevValues?.imagePath || null,
    privacy: prevValues?.privacy || 'PUBLIC',
    description: prevValues?.description || '',
    externalCode: prevValues?.externalCode || '',
    slogan: prevValues?.slogan || '',
  }

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CovenantFormSchemaType>({
    resolver: zodResolver(createCovenantFormSchema),
    defaultValues,
  })

  async function submitCovenantForm(data: CovenantFormSchemaType) {
    if (data.imagePath && typeof data.imagePath !== 'string') {
      if (prevValues?.imagePath) {
        await CovenantsService.deleteImageFromStorage({
          url: prevValues.imagePath,
        })
      }

      const imagePath = await CovenantsService.uploadFile({
        file: data.imagePath,
      })

      data.imagePath = imagePath
    }

    if (data.logoPath && typeof data.logoPath !== 'string') {
      if (prevValues?.logoPath) {
        await CovenantsService.deleteImageFromStorage({
          url: prevValues.logoPath,
        })
      }

      const logoPath = await CovenantsService.uploadFile({
        file: data.logoPath,
      })

      data.logoPath = logoPath
    }

    if (prevValues) {
      await updateCovenantFn({
        ...prevValues,
        ...data,
      })
    } else {
      const payload = createCovenantMapper({
        ...data,
        imagePath: data.imagePath!,
        logoPath: data.logoPath!,
      })

      console.log('payload', payload)

      await insertCovenantFn(payload)
    }
  }

  return {
    errors,
    setValue,
    register,
    handleSubmit,
    isSubmitting,
    defaultValues,
    submitCovenantForm,
  }
}
