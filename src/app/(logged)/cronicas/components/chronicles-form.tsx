'use client'

import * as FormComponents from '@/components/FormComponents'
import { useChroniclesForm } from '../hooks/use-chronicles-form'
import { ButtonSpinner } from '@/components/ButtonSpinner'
import { Anchor } from '@/components/Anchor'
import type { ChroniclesType } from '@/@types/Database'

interface ChroniclesFormProps {
  prevValues?: ChroniclesType | null
}

export function ChroniclesForm({ prevValues = null }: ChroniclesFormProps) {
  const {
    watch,
    formState: { errors, isSubmitting },
    setValue,
    register,
    handleSubmit,
    defaultValues,
    submitChorniclesForm,
  } = useChroniclesForm({ prevValues })

  return (
    <form
      className="mx-auto w-full space-y-4 pb-24"
      onSubmit={handleSubmit(submitChorniclesForm)}
    >
      <div className="flex items-center justify-start md:justify-end">
        <FormComponents.Switch
          label="Ativar Crônica"
          onCheckedChange={(checked) => {
            setValue('active', checked)
          }}
          checked={watch('active')}
          defaultChecked={watch('active')}
        />
      </div>

      <FormComponents.Input
        label="Título"
        type="text"
        placeholder="Inisira um título para a crônica"
        register={register('title')}
        errorMessage={errors.title?.message}
      />

      <FormComponents.Date
        id="date"
        label="Data"
        onValueChange={(value) => setValue('date', value)}
        value={watch('date')}
        errorMessage={errors.date?.message}
      />

      <FormComponents.Editor
        content={defaultValues?.content || null}
        label="Conteúdo"
        errorMessage={errors.content?.message}
        setContent={(content) => setValue('content', content)}
      />

      <FormComponents.Input
        label="Autor"
        type="text"
        placeholder="Inisira o nome do autor"
        register={register('author')}
        errorMessage={errors.author?.message}
      />

      <FormComponents.Input
        label="Autoria"
        type="text"
        placeholder="Inisira a autoria"
        register={register('authorship')}
        errorMessage={errors.authorship?.message}
      />

      <div className="flex w-full flex-col items-center justify-end gap-2 md:flex-row">
        <Anchor variant="outline" href="/cronicas" className="w-full md:w-auto">
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
