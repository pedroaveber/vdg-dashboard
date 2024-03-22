'use client'

import * as Dialog from '@radix-ui/react-alert-dialog'
import * as FormComponents from '@/components/FormComponents'
import { useFirstAcess } from './useFirstAccess'
import { UserType } from '@/@types/Database'
import { ButtonSpinner } from '../ButtonSpinner'

interface FirstAcessDialogProps {
  shouldDisplayFirstAccessDialog: boolean
  setShouldDisplayFirstAccessDialog: (shouldDisplay: boolean) => void
  user: UserType | null
}

export function FirstAcessDialog({
  setShouldDisplayFirstAccessDialog,
  shouldDisplayFirstAccessDialog,
  user,
}: FirstAcessDialogProps) {
  const {
    errors,
    isSubmitting,
    handleChangeUserInfo,
    handleSubmit,
    register,
    setValue,
  } = useFirstAcess({ setShouldDisplayFirstAccessDialog, user: user! })

  if (user) {
    setValue('email', user.email)
  }

  return (
    <Dialog.Root
      open={shouldDisplayFirstAccessDialog}
      onOpenChange={setShouldDisplayFirstAccessDialog}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-zinc-300 bg-white p-4 shadow-sm data-[state=open]:animate-contentShow dark:border-zinc-500 dark:bg-zinc-900 md:w-full">
          <div className="fixed left-0 right-0 top-0 flex h-[60px] items-center justify-start px-4">
            <Dialog.Title className="text-lg font-bold text-zinc-700 dark:text-zinc-50">
              Cadastre seu perfil
            </Dialog.Title>
          </div>

          <form
            id="first-access-form"
            className="mt-[50px] max-h-[400px] w-full space-y-4 overflow-y-auto pr-4"
            onSubmit={handleSubmit(handleChangeUserInfo)}
          >
            <FormComponents.Avatar
              setImagePreview={(imagePreview) =>
                setValue('avatar', imagePreview)
              }
            />

            <FormComponents.Input
              type="text"
              label="Nome Completo"
              placeholder="Digite o seu nome"
              register={register('name')}
              errorMessage={errors?.name?.message}
            />

            <FormComponents.Input
              type="email"
              label="E-mail"
              placeholder="Digite o seu e-mail"
              register={register('email')}
              readOnly
            />

            <FormComponents.Input
              type="password"
              label="Nova senha"
              placeholder="Digite sua nova senha"
              register={register('password')}
              errorMessage={errors?.password?.message}
            />

            <FormComponents.Input
              type="password"
              label="Confirme sua senha"
              placeholder="Digite sua nova senha novamente"
              register={register('confirmPassword')}
              errorMessage={errors?.confirmPassword?.message}
            />
          </form>

          <div className="mt-8 flex w-full items-center justify-end gap-2">
            <FormComponents.Button
              disabled={isSubmitting}
              type="submit"
              form="first-access-form"
            >
              {isSubmitting ? <ButtonSpinner /> : 'Salvar alterações'}
            </FormComponents.Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
