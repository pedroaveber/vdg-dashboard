'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import * as FormComponents from '@/components/FormComponents'
import { useBannerForm } from '../hooks/use-banner-form'
import { ButtonSpinner } from '@/components/ButtonSpinner'
import { BannerType } from '@/@types/Database'
import { Anchor } from '@/components/Anchor'
import { BannerService } from '@/lib/firebase/database/banners-service'

interface BannerFormProps {
  prevValues?: BannerType | null
}

export function BannerForm({ prevValues = null }: BannerFormProps) {
  const {
    errors,
    setValue,
    register,
    isSubmitting,
    handleSubmit,
    defaultValues,
    submitBannerForm,
  } = useBannerForm({ prevValues })

  const router = useRouter()

  useEffect(() => {
    BannerService.getAllDocuments<BannerType>().then((values) => {
      if (values.quantity >= BannerService.maxItems) {
        router.push('/banners')
      }
    })
  }, [router])

  return (
    <form
      className="w-full space-y-4 pb-24"
      onSubmit={handleSubmit(submitBannerForm)}
    >
      <FormComponents.Switch
        label="Ativar banner"
        onCheckedChange={(checked) => setValue('active', checked)}
        defaultChecked={defaultValues?.active || true}
      />

      <FormComponents.Input
        label="Título"
        type="text"
        placeholder="Inisira um título para o banner"
        register={register('title')}
        errorMessage={errors.title?.message}
      />

      <FormComponents.Input
        label="Link"
        type="url"
        placeholder="Inisira um link para o banner"
        register={register('link')}
        errorMessage={errors.link?.message}
      />

      <FormComponents.FileInput
        label="Imagem"
        imagePreview={defaultValues?.imagePath || null}
        setImagePreview={(previewUrl) => setValue('imagePath', previewUrl)}
        errorMessage={errors.imagePath?.message as string}
        aspectRatio="banner"
      />

      <div className="flex flex-col items-center justify-end gap-2 md:flex-row">
        <Anchor variant="outline" href="/banners" className="w-full md:w-auto">
          Voltar
        </Anchor>

        <FormComponents.Button
          disabled={isSubmitting}
          type="submit"
          variant="primary"
          className="flex w-full items-center justify-center py-3 md:w-auto md:py-2"
        >
          {isSubmitting ? <ButtonSpinner /> : 'Salvar alterações'}
        </FormComponents.Button>
      </div>
    </form>
  )
}
