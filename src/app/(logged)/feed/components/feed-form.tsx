'use client'

import * as FormComponents from '@/components/FormComponents'
import { useFeedForm } from '../hooks/use-feed-form'
import type { FeedType } from '@/@types/Database'
import { Anchor } from '@/components/Anchor'
import { Publisher } from '@/components/Publisher'
// import { WhatsappAlertDialog } from './WhatsappAlertDialog'
import { redirect } from 'next/navigation'
// import { useConfigContext } from '@/contexts/ConfigContext'

interface FeedFormProps {
  prevValues?: FeedType | null
  publisher?: {
    id: string
    name: string | null
    avatar: string | null
  } | null
}

export function FeedForm({
  prevValues = null,
  publisher = null,
}: FeedFormProps) {
  const {
    // watch,
    errors,
    setValue,
    register,
    isSubmitting,
    handleSubmit,
    saveFeedData,
    defaultValues,
    saveAndPublishFeedData,
  } = useFeedForm({ prevValues })

  // const { dashConfig } = useConfigContext()

  // const shouldDisplayAlertDialog = watch('publishOnWhatsapp')
  // const isWhatsappEnabled = dashConfig.whatsappAlert

  if (prevValues && prevValues.published) {
    redirect('/feed')
  }

  return (
    <form
      className="w-full space-y-4 pb-24"
      onSubmit={handleSubmit(saveFeedData)}
      id="feed-form"
    >
      <FormComponents.Input
        label="Link"
        type="url"
        placeholder="Inisira um link para o feed"
        register={register('link')}
        errorMessage={errors.link?.message}
      />

      <FormComponents.Select.Root
        label="Privacidade"
        placeholder="Selecione um item"
        defaultValue={defaultValues?.privacy}
        onValueChange={(
          value: 'VIP_MEMBERS_ONLY' | 'PUBLIC' | 'MEMBERS_ONLY' | 'REGISTEREDS',
        ) => setValue('privacy', value)}
      >
        <FormComponents.Select.Item value="PUBLIC" text="Pública" />

        <FormComponents.Select.Item value="REGISTEREDS" text="Cadastrados" />

        <FormComponents.Select.Item value="MEMBERS_ONLY" text="Membros" />

        <FormComponents.Select.Item
          value="VIP_MEMBERS_ONLY"
          text="Membros VIP"
        />
      </FormComponents.Select.Root>

      <FormComponents.Editor
        content={defaultValues?.description || null}
        label="Conteúdo"
        errorMessage={errors.description?.message}
        setContent={(content) => setValue('description', content)}
        link={false}
      />

      <div className="flex w-full flex-col gap-4 md:flex-row">
        <FormComponents.FileInput
          label="Imagem"
          imagePreview={defaultValues?.imagePath || null}
          setImagePreview={(previewUrl) => setValue('imagePath', previewUrl)}
          errorMessage={errors.imagePath?.message as string}
          aspectRatio="news"
        />

        {/* <FormComponents.FileInput
          label="Imagem secundária"
          imagePreview={defaultValues?.secondaryImagePath || null}
          setImagePreview={(previewUrl) =>
            setValue('secondaryImagePath', previewUrl)
          }
          errorMessage={errors.secondaryImagePath?.message as string}
          aspectRatio="news"
        /> */}
      </div>

      <div className="flex w-full flex-col items-start gap-8 md:flex-row md:items-end md:justify-between md:gap-4">
        <div className="flex w-full flex-col items-start gap-4 md:w-1/3">
          {/* <FormComponents.Switch
            label="Publicar no whatsapp"
            onCheckedChange={() =>
              setValue('publishOnWhatsapp', !watch('publishOnWhatsapp'))
            }
            defaultChecked={defaultValues?.publishOnWhatsapp}
            className="justify-start md:justify-start"
          /> */}

          {publisher && prevValues && publisher.name && (
            <Publisher publisher={publisher} createdAt={prevValues.createdAt} />
          )}
        </div>

        <div className="flex w-full flex-1 flex-col items-center justify-end gap-2 md:flex-row">
          <Anchor variant="outline" href="/feed" className="w-full md:w-auto">
            Voltar
          </Anchor>

          <FormComponents.Button
            type="submit"
            disabled={isSubmitting}
            variant="outline"
            className="flex w-full items-center justify-center py-3 md:w-auto md:py-2"
          >
            Salvar
          </FormComponents.Button>

          <FormComponents.Button
            type="button"
            variant="primary"
            className="flex w-full items-center justify-center py-3 md:w-auto md:py-2"
            disabled={isSubmitting}
            onClick={handleSubmit(saveAndPublishFeedData)}
          >
            Publicar e salvar
          </FormComponents.Button>

          {/* {shouldDisplayAlertDialog && isWhatsappEnabled ? (
            <WhatsappAlertDialog
              handleSubmit={handleSubmit(saveAndPublishFeedData)}
              isSubmitting={isSubmitting}
            >
              <FormComponents.Button
                type="button"
                variant="primary"
                className="flex w-full items-center justify-center py-3 md:w-auto md:py-2"
              >
                Publicar e salvar
              </FormComponents.Button>
            </WhatsappAlertDialog>
          ) : (
            <FormComponents.Button
              type="button"
              variant="primary"
              className="flex w-full items-center justify-center py-3 md:w-auto md:py-2"
              disabled={isSubmitting}
              onClick={handleSubmit(saveAndPublishFeedData)}
            >
              Publicar e salvar
            </FormComponents.Button>
          )} */}
        </div>
      </div>
    </form>
  )
}
