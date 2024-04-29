'use client'

import { Button, Input } from '@/components/FormComponents'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { socialMediaService } from './services'
import { Skeleton } from '@/components/skeleton'
import { toast } from 'react-toastify'

const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/

const socialMediaFormSchema = z.object({
  facebook: z
    .string()
    .nullable()
    .transform((value) => (value === '' ? null : value))
    .refine((value) => value === null || urlRegex.test(value), {
      message: 'Insira uma URL válida',
    }),
  whatsapp: z
    .string()
    .nullable()
    .transform((value) => (value === '' ? null : value))
    .refine((value) => value === null || urlRegex.test(value), {
      message: 'Insira uma URL válida',
    }),
  linkedin: z
    .string()
    .nullable()
    .transform((value) => (value === '' ? null : value))
    .refine((value) => value === null || urlRegex.test(value), {
      message: 'Insira uma URL válida',
    }),
  instagram: z
    .string()
    .nullable()
    .transform((value) => (value === '' ? null : value))
    .refine((value) => value === null || urlRegex.test(value), {
      message: 'Insira uma URL válida',
    }),
  twitter: z
    .string()
    .nullable()
    .transform((value) => (value === '' ? null : value))
    .refine((value) => value === null || urlRegex.test(value), {
      message: 'Insira uma URL válida',
    }),
  pinterest: z
    .string()
    .nullable()
    .transform((value) => (value === '' ? null : value))
    .refine((value) => value === null || urlRegex.test(value), {
      message: 'Insira uma URL válida',
    }),
  reddit: z
    .string()
    .nullable()
    .transform((value) => (value === '' ? null : value))
    .refine((value) => value === null || urlRegex.test(value), {
      message: 'Insira uma URL válida',
    }),
})

type SocialMediaForm = z.infer<typeof socialMediaFormSchema>

export default function SocialMediaPage() {
  const { data: socialMedias, isLoading: isLoadingSocialMedias } = useQuery({
    queryKey: ['social-media'],
    queryFn: async () => socialMediaService.get('social-media'),
  })

  const { mutateAsync: updateSocialMediaFn } = useMutation({
    mutationFn: async (data: SocialMediaForm) => {
      await socialMediaService.create({
        ...data,
        active: true,
        createdAt: new Date().toISOString(),
        id: 'social-media',
        timestamp: new Date().getTime(),
      })
    },
    onSuccess: () => {
      toast.success('Mídias sociais atualizadas!')
    },
  })

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<SocialMediaForm>({
    resolver: zodResolver(socialMediaFormSchema),
    values: {
      facebook: socialMedias?.facebook ?? '',
      instagram: socialMedias?.instagram ?? '',
      twitter: socialMedias?.twitter ?? '',
      pinterest: socialMedias?.pinterest ?? '',
      reddit: socialMedias?.reddit ?? '',
      linkedin: socialMedias?.linkedin ?? '',
      whatsapp: socialMedias?.whatsapp ?? '',
    },
  })

  async function handleUpdateSocialMedia(data: SocialMediaForm) {
    await updateSocialMediaFn(data)
  }

  return (
    <form
      onSubmit={handleSubmit(handleUpdateSocialMedia)}
      className="mx-auto w-full max-w-xl space-y-4"
    >
      {isLoadingSocialMedias ? (
        <PageSkeleton />
      ) : (
        <>
          <Input
            label="Facebook"
            placeholder="Digite a URL do seu facebook"
            type="text"
            register={register('facebook')}
            errorMessage={errors.facebook?.message}
          />

          <Input
            label="Instagram"
            placeholder="Digite a URL do seu instagram"
            type="text"
            register={register('instagram')}
            errorMessage={errors.instagram?.message}
          />

          <Input
            label="Twitter (X)"
            placeholder="Digite a URL do seu Twitter (X)"
            type="text"
            register={register('twitter')}
            errorMessage={errors.twitter?.message}
          />

          <Input
            label="Pinterest"
            placeholder="Digite a URL do seu Pinterest"
            type="text"
            register={register('pinterest')}
            errorMessage={errors.pinterest?.message}
          />

          <Input
            label="Reddit"
            placeholder="Digite a URL do seu Reddit"
            type="text"
            register={register('reddit')}
            errorMessage={errors.reddit?.message}
          />

          <Input
            label="Linkedin"
            placeholder="Digite a URL do seu Linkedin"
            type="text"
            register={register('linkedin')}
            errorMessage={errors.linkedin?.message}
          />

          <Input
            label="WhatsApp"
            placeholder="Digite a URL do seu WhatsApp"
            type="text"
            register={register('whatsapp')}
            errorMessage={errors.whatsapp?.message}
          />

          <Button disabled={isSubmitting} className="ml-auto">
            Salvar
          </Button>
        </>
      )}
    </form>
  )
}

function PageSkeleton() {
  return (
    <>
      <div className="flex w-full flex-col items-start gap-2">
        <Skeleton className="h-6 w-[100px] rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      <div className="flex w-full flex-col items-start gap-2">
        <Skeleton className="h-6 w-[100px] rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      <div className="flex w-full flex-col items-start gap-2">
        <Skeleton className="h-6 w-[100px] rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      <div className="flex w-full flex-col items-start gap-2">
        <Skeleton className="h-6 w-[100px] rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      <div className="flex w-full flex-col items-start gap-2">
        <Skeleton className="h-6 w-[100px] rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      <div className="flex w-full flex-col items-start gap-2">
        <Skeleton className="h-6 w-[100px] rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </>
  )
}
