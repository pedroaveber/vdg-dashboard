'use client'

// Components
import { Anchor } from '@/components/Anchor'
import { ButtonSpinner } from '@/components/ButtonSpinner'
import * as FormComponents from '@/components/FormComponents'

// Hooks
import { useChannelForm } from '../hooks/use-channel-form'

// Types
import type { ChannelType } from '@/@types/Database'

interface ChannelFormProps {
  channel?: ChannelType | null
}

export function ChannelForm({ channel = null }: ChannelFormProps) {
  const {
    createOrUpdateChannel,
    errors,
    handleSubmit,
    defaultValues,
    isSubmitting,
    register,
    setValue,
    watch,
  } = useChannelForm({ prevValues: channel })

  return (
    <form
      className="flex w-full flex-col gap-4 pb-24"
      onSubmit={handleSubmit(createOrUpdateChannel)}
    >
      <nav className="mb-8 grid w-full grid-cols-2 gap-2">
        <button
          disabled={watch('type') === 'playlist'}
          data-active={watch('type') === 'playlist'}
          onClick={() => setValue('type', 'playlist')}
          className="flex w-full items-center justify-center rounded-lg border border-zinc-300 py-3 text-sm font-semibold text-zinc-700 transition-colors data-[active=true]:bg-red-600 data-[active=true]:text-white hover:bg-zinc-50 data-[active=true]:hover:bg-red-600 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800 data-[active=true]:dark:hover:bg-red-600"
        >
          PLAYLIST
        </button>

        <button
          disabled={watch('type') === 'partners'}
          data-active={watch('type') === 'partners'}
          onClick={() => setValue('type', 'partners')}
          className="flex w-full items-center justify-center rounded-lg border border-zinc-300 py-3 text-sm font-semibold text-zinc-700 transition-colors data-[active=true]:bg-red-600 data-[active=true]:text-white hover:bg-zinc-50 data-[active=true]:hover:bg-red-600 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800 data-[active=true]:dark:hover:bg-red-600"
        >
          CANAL
        </button>
      </nav>

      <FormComponents.Input
        type="text"
        label={`Nome ${
          watch('type') === 'playlist' ? 'da playlist' : 'do canal'
        }`}
        register={register('name')}
        placeholder={`Insira o nome  ${
          watch('type') === 'playlist' ? 'da playlist' : 'do canal'
        }`}
        errorMessage={errors?.name?.message as string}
      />

      <FormComponents.Input
        type="text"
        label="Link"
        register={register('link')}
        errorMessage={errors?.link?.message}
        placeholder={`Insira o link  ${
          watch('type') === 'playlist' ? 'da playlist' : 'do canal'
        }`}
      />

      <FormComponents.FileInput
        label={`Imagem ${
          watch('type') === 'playlist' ? 'da playlist' : 'do canal'
        }`}
        imagePreview={defaultValues?.imagePath ?? null}
        setImagePreview={(image) => setValue('imagePath', image)}
        errorMessage={errors?.imagePath?.message as string}
        inputSize="SMALL"
        className="h-[150px] w-[150px]"
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
