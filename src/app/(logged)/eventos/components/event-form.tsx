'use client'

import * as FormComponents from '@/components/FormComponents'
import { useEventForm } from '../hooks/use-event-form'
import { ButtonSpinner } from '@/components/ButtonSpinner'
import { EventType } from '@/@types/Database'
import { Anchor } from '@/components/Anchor'
import { useMasks } from '@/hooks/useMasks'

import axios from 'axios'

import { useEffect } from 'react'
import { toast } from 'react-toastify'

interface EventFormProps {
  prevValues?: EventType | null
}

export function EventForm({ prevValues = null }: EventFormProps) {
  const {
    watch,
    errors,
    setValue,
    register,
    isSubmitting,
    handleSubmit,
    defaultValues,
    submitEventForm,
  } = useEventForm({ prevValues })

  const { createCepMask, createHourMask } = useMasks()

  async function getAddressByCep(cep: string | null | undefined) {
    if (!cep) return null
    if (cep.length < 9) return

    const viacepBase = 'https://viacep.com.br/ws'
    const formattedCep = cep.replace(/\D/g, '')

    const response = await axios.get(`${viacepBase}/${formattedCep}/json`)
    const address = await response.data

    if (address) {
      setValue('address', address.logradouro)
      setValue('neighborhood', address.bairro)
      setValue('city', address.localidade)
      setValue('state', address.uf)
    }
  }
  const isPaymentManagementEnabled = watch('paymentManagement')

  useEffect(() => {
    const hasErrors = Object.keys(errors).length > 0
    if (hasErrors) {
      toast.error('Existem erros no formulário')
    }
  }, [errors])

  return (
    <form
      className="w-full space-y-4 pb-24"
      onSubmit={handleSubmit(submitEventForm)}
    >
      <FormComponents.Switch
        label="Ativar evento"
        onCheckedChange={() => setValue('active', !watch('active'))}
        defaultChecked={defaultValues?.active}
      />

      <FormComponents.Input
        type="text"
        label="Título"
        placeholder="Digite o título do evento"
        register={register('title')}
        autoComplete="username"
        errorMessage={errors.title?.message}
      />

      <FormComponents.Input
        type="text"
        label="Subtítulo"
        placeholder="Digite o subtítulo do evento"
        register={register('subtitle')}
        errorMessage={errors.subtitle?.message}
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

      <FormComponents.Input
        type="text"
        label="Local"
        placeholder="Digite o local do evento"
        register={register('local')}
        errorMessage={errors.local?.message}
      />

      <FormComponents.Input
        type="text"
        label="CEP"
        register={register('zipcode')}
        value={createCepMask(watch('zipcode')) || ''}
        onBlur={() => getAddressByCep(watch('zipcode'))}
        maxLength={9}
        errorMessage={errors.zipcode?.message}
        className="w-28"
      />

      <div className="grid w-full grid-cols-2 gap-4">
        <FormComponents.Date
          id="date"
          label="Data"
          errorMessage={errors.date?.message}
          onValueChange={(value) => setValue('validity', value)}
          value={watch('validity') || null}
        />

        <FormComponents.Input
          type="text"
          label="Hora"
          placeholder="Digite a hora do evento"
          register={register('hour')}
          value={createHourMask(watch('hour')) || ''}
          maxLength={5}
          errorMessage={errors.hour?.message as string}
        />
      </div>

      <div className="grid w-full grid-cols-2 gap-4">
        <FormComponents.Date
          onValueChange={(value) => setValue('date', value)}
          value={watch('date') || null}
          id="validade"
          label="Data máxima de confirmação"
          errorMessage={errors.validity?.message}
        />
      </div>

      <FormComponents.Input
        type="text"
        label="Logradouro"
        placeholder="Digite o logradouro do evento"
        register={register('address')}
        errorMessage={errors.address?.message}
      />

      <FormComponents.Input
        type="text"
        label="Número"
        placeholder="Digite o número"
        register={register('number')}
        errorMessage={errors.number?.message}
      />

      <FormComponents.Input
        type="text"
        label="Complemento"
        placeholder="Digite o complemento"
        register={register('complement')}
        errorMessage={errors.complement?.message}
      />

      <FormComponents.Input
        type="text"
        label="Bairro"
        placeholder="Digite o bairro"
        register={register('neighborhood')}
        errorMessage={errors.neighborhood?.message}
      />

      <FormComponents.Input
        type="text"
        label="Cidade"
        placeholder="Digite a cidade"
        register={register('city')}
        errorMessage={errors.city?.message}
      />

      <FormComponents.Input
        type="text"
        label="Estado"
        placeholder="Digite o estado"
        register={register('state')}
        errorMessage={errors.state?.message}
      />

      <FormComponents.Input
        type="text"
        label="Link"
        placeholder="Digite o link do evento"
        register={register('link')}
        errorMessage={errors.link?.message}
      />

      <FormComponents.Editor
        label="Conteúdo"
        errorMessage={errors.description?.message}
        content={defaultValues?.description || null}
        setContent={(content) => setValue('description', content)}
      />

      <FormComponents.Input
        label="Mensagem de alerta"
        errorMessage={errors.alertMessage?.message}
        register={register('alertMessage')}
        maxLength={85}
        type="text"
      />

      <FormComponents.FileInput
        label="Imagem capa"
        imagePreview={defaultValues?.imagePath || null}
        setImagePreview={(previewUrl) => setValue('imagePath', previewUrl)}
        errorMessage={errors.imagePath?.message as string}
        aspectRatio="news"
      />

      <FormComponents.FileInput
        label="Imagem evento"
        imagePreview={defaultValues?.backgroundImagePath || null}
        setImagePreview={(previewUrl) =>
          setValue('backgroundImagePath', previewUrl)
        }
        errorMessage={errors.imagePath?.message as string}
        aspectRatio="news"
      />

      <FormComponents.NewSwitch.Root className="md:justify-start">
        <FormComponents.NewSwitch.Label label="Gerenciar pagamento" />

        <FormComponents.NewSwitch.Trigger
          onCheckedChange={() => {
            setValue('price', null)
            setValue('paymentManagement', !watch('paymentManagement'))
          }}
          defaultChecked={isPaymentManagementEnabled}
        />
      </FormComponents.NewSwitch.Root>

      {isPaymentManagementEnabled && (
        <>
          <FormComponents.CurrencyInput
            errorMessage={errors?.price?.message}
            register={register('price')}
            type="text"
            label="Valor"
          />
        </>
      )}

      <div className="flex flex-col items-center justify-end gap-2 md:flex-row">
        <Anchor variant="outline" href="/eventos" className="w-full md:w-auto">
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
