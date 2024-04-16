'use client'

import * as FormComponents from '@/components/FormComponents'
import { useNewsForm } from '../hooks/use-news-form'
import { ButtonSpinner } from '@/components/ButtonSpinner'
import { Anchor } from '@/components/Anchor'
import { Publisher } from '@/components/Publisher'
import type { NewsType } from '@/@types/Database'

interface NewsFromProps {
  prevValues?: NewsType | null
  publisher?: NewsType['author'] | null
}

export function NewsForm({
  prevValues = null,
  publisher = null,
}: NewsFromProps) {
  const {
    watch,
    formState: { errors, isSubmitting },
    setValue,
    register,
    handleSubmit,
    defaultValues,
    submitNewsForm,
  } = useNewsForm({ prevValues })

  return (
    <form
      className="mx-auto w-full space-y-4 pb-24"
      onSubmit={handleSubmit(submitNewsForm)}
    >
      <div className="flex items-center justify-start md:justify-end">
        <FormComponents.Switch
          label="Ativar notícia"
          onCheckedChange={(checked) => setValue('active', checked)}
          defaultChecked={defaultValues.active}
        />
      </div>

      <FormComponents.Input
        label="Título"
        type="text"
        placeholder="Inisira um título para a notícia"
        register={register('title')}
        errorMessage={errors.title?.message}
      />

      <FormComponents.Input
        label="Link"
        type="url"
        placeholder="Inisira um link para a notícia"
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

      <FormComponents.Date
        id="date"
        label="Data da notícia"
        onValueChange={(value) => setValue('date', value)}
        value={watch('date')}
        errorMessage={errors.date?.message}
      />

      <FormComponents.Editor
        content={defaultValues?.description || null}
        label="Conteúdo"
        errorMessage={errors.description?.message}
        setContent={(content) => setValue('description', content)}
      />

      <FormComponents.FileInput
        label="Imagem"
        imagePreview={defaultValues?.imagePath || null}
        setImagePreview={(previewUrl) => setValue('imagePath', previewUrl)}
        errorMessage={errors.imagePath?.message as string}
        aspectRatio="news"
      />

      <div className="flex w-full flex-col items-start gap-8 md:flex-row md:items-end md:justify-between md:gap-4">
        {publisher && prevValues && publisher.name && (
          <Publisher publisher={publisher} createdAt={prevValues.createdAt} />
        )}

        <div className="flex w-full flex-col items-center justify-end gap-2 md:flex-row">
          <Anchor
            variant="outline"
            href="/noticias"
            className="w-full md:w-auto"
          >
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
      </div>
    </form>
  )
}
