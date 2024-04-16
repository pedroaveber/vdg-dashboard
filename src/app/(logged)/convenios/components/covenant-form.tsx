'use client'

import * as FormComponents from '@/components/FormComponents'
import { useCovenantForm } from '../hooks/use-covenant-form'
import { ButtonSpinner } from '@/components/ButtonSpinner'
import { CovenantType } from '@/@types/Database'
import { Anchor } from '@/components/Anchor'

interface CovenantFormProps {
  prevValues?: CovenantType | null
}

export function CovenantForm({ prevValues = null }: CovenantFormProps) {
  const {
    errors,
    setValue,
    register,
    isSubmitting,
    handleSubmit,
    defaultValues,
    submitCovenantForm,
  } = useCovenantForm({ prevValues })

  return (
    <form
      className="w-full space-y-4 pb-24"
      onSubmit={handleSubmit(submitCovenantForm)}
    >
      <FormComponents.Switch
        label="Ativar Convênio"
        onCheckedChange={(checked) => setValue('active', checked)}
        defaultChecked={defaultValues?.active || true}
      />

      <FormComponents.Input
        label="Título"
        type="text"
        placeholder="Inisira um título para o convênio"
        register={register('title')}
        errorMessage={errors.title?.message}
      />

      <FormComponents.Input
        label="Slogan"
        type="text"
        placeholder="Inisira um slogan para o convênio"
        register={register('slogan')}
        errorMessage={errors.slogan?.message}
      />

      <FormComponents.Input
        label="Link"
        type="url"
        placeholder="Inisira um link para o convênio"
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

        <FormComponents.Select.Item
          value="REGISTEREDS"
          text="Somente para cadastrados"
        />

        <FormComponents.Select.Item
          value="MEMBERS_ONLY"
          text="Somente para membros"
        />

        <FormComponents.Select.Item
          value="VIP_MEMBERS_ONLY"
          text="Somenete para membros VIP"
        />
      </FormComponents.Select.Root>

      <FormComponents.Editor
        label="Conteúdo"
        errorMessage={errors.description?.message}
        heading={false}
        subHeading={false}
        unorderedList={false}
        heading3={false}
        content={defaultValues?.description || null}
        setContent={(content) => setValue('description', content)}
      />

      <div className="flex flex-col gap-4 md:flex-row md:gap-8">
        <FormComponents.FileInput
          label="Capa (600x300)"
          imagePreview={defaultValues?.imagePath || null}
          setImagePreview={(previewUrl) => setValue('imagePath', previewUrl)}
          errorMessage={errors.imagePath?.message as string}
          aspectRatio="news"
          accept="image/*"
        />

        <FormComponents.FileInput
          label="Logotipo (340 x 80)"
          imagePreview={defaultValues?.logoPath || null}
          setImagePreview={(previewUrl) => setValue('logoPath', previewUrl)}
          errorMessage={errors.logoPath?.message as string}
          aspectRatio="news"
          customDescription={'PNG ou SVG até 2MB'}
          accept="image/*"
        />
      </div>

      <FormComponents.Input
        label="QR Code"
        type="text"
        placeholder="Inisira um código para o QR Code"
        register={register('qrCode')}
        errorMessage={errors.link?.message}
      />

      <FormComponents.Input
        label="Código externo"
        type="text"
        placeholder="Inisira um código externo para o convênio"
        register={register('externalCode')}
        errorMessage={errors.link?.message}
      />

      <div className="flex flex-col items-center justify-end gap-2 md:flex-row">
        <Anchor
          variant="outline"
          href="/convenios"
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
    </form>
  )
}
