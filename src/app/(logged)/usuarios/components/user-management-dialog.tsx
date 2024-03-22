'use client'

import * as Dialog from '@radix-ui/react-alert-dialog'

import { Switch } from '@/components/UI/switch'
import { ButtonSpinner } from '@/components/ButtonSpinner'
import * as FormComponents from '@/components/FormComponents'

import { useUserManagement } from '../hooks/use-user-management'
import { useUsers } from '../hooks/use-users'

interface UserManagementDialogProps {
  children: React.ReactNode
}

export function UserManagementDialog({ children }: UserManagementDialogProps) {
  const {
    watch,
    formState: { errors, isSubmitting },
    open,
    setOpen,
    register,
    setValue,
    hasCopied,
    handleSubmit,
    temporaryPassword,
    handleResetDialog,
    handleCreateUser,
    handleCopyTemporaryPassword,
  } = useUserManagement()

  const { policies } = useUsers()

  function togglePolicy(policy: string, isIncluded: boolean) {
    const currentPolicies = watch('policy')
    isIncluded
      ? setValue(
          'policy',
          currentPolicies.filter((item) => item !== policy),
        )
      : setValue('policy', [...currentPolicies, policy])
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-zinc-300 bg-white p-4 shadow-sm data-[state=open]:animate-contentShow dark:border-zinc-500 dark:bg-zinc-900 md:w-full">
          {temporaryPassword && (
            <TemporaryPassword
              temporaryPassword={temporaryPassword}
              hasCopied={hasCopied}
              handleResetDialog={handleResetDialog}
              handleCopyTemporaryPassword={handleCopyTemporaryPassword}
            />
          )}

          {!temporaryPassword && (
            <>
              <div className="fixed left-0 right-0 top-0 flex h-[60px] items-center justify-start px-4">
                <Dialog.Title className="text-lg font-bold text-zinc-700 dark:text-zinc-50">
                  Adicionar novo administrador
                </Dialog.Title>
              </div>

              <form
                className="mt-[60px] max-h-[300px] w-full space-y-4 overflow-y-auto pr-4"
                id="handle-create-user-form"
                onSubmit={handleSubmit(handleCreateUser)}
              >
                <FormComponents.Input
                  type="email"
                  label="E-mail"
                  register={register('email')}
                  errorMessage={errors.email?.message}
                />

                <div className="space-y-4">
                  <span className="block font-medium">Permissões</span>

                  <div className="w-full space-y-2">
                    {Object.keys(policies).map((policy) => {
                      const currentPolicies = watch('policy')
                      const isChecked = currentPolicies.includes(policy)
                      return (
                        <div
                          key={policy}
                          className="flex w-full items-center justify-between border-b border-dashed border-zinc-300 py-2 dark:border-zinc-500"
                        >
                          <span>{policies[policy]}</span>
                          <Switch
                            checked={isChecked}
                            onCheckedChange={() =>
                              togglePolicy(policy, isChecked)
                            }
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </form>

              <div className="mt-8 flex w-full items-center justify-end gap-2">
                <Dialog.Cancel asChild>
                  <FormComponents.Button
                    onClick={handleResetDialog}
                    variant="ghost"
                    className="font-bold"
                  >
                    Fechar
                  </FormComponents.Button>
                </Dialog.Cancel>

                <FormComponents.Button
                  type="submit"
                  form="handle-create-user-form"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <ButtonSpinner /> : 'Criar usuário'}
                </FormComponents.Button>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

interface AdminAlreadyExistsProps {
  handleResetDialog: () => void
}

function AdminAlreadyExists({ handleResetDialog }: AdminAlreadyExistsProps) {
  return (
    <>
      <div className="fixed left-0 right-0 top-0 flex h-[60px] items-center justify-start px-4">
        <Dialog.Title className="text-lg font-bold text-zinc-700 dark:text-zinc-50">
          Este usuário já existe
        </Dialog.Title>
      </div>

      <div className="mt-[60px] space-y-4 ">
        <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-50">
          Este usuário já existe e está cadastrado como administrador do
          dashboard.
        </p>

        <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-50">
          Para remover o acesso de administrador deste usuário ou editar suas
          permissões, acesse a página anterior e selecione a opção
          &quot;Gerenciar permissões&quot;.
        </p>
      </div>

      <div className="mt-8 flex w-full items-center justify-end gap-2">
        <Dialog.Cancel asChild>
          <FormComponents.Button
            onClick={handleResetDialog}
            variant="ghost"
            className="font-bold"
          >
            Fechar
          </FormComponents.Button>
        </Dialog.Cancel>
      </div>
    </>
  )
}

interface TemporaryPasswordProps {
  temporaryPassword: string
  hasCopied: boolean
  handleCopyTemporaryPassword: () => void
  handleResetDialog: () => void
}

function TemporaryPassword({
  handleCopyTemporaryPassword,
  handleResetDialog,
  hasCopied,
  temporaryPassword,
}: TemporaryPasswordProps) {
  return (
    <>
      <div className="fixed left-0 right-0 top-0 flex h-[60px] items-center justify-start px-4">
        <Dialog.Title className="text-lg font-bold text-zinc-700 dark:text-zinc-50">
          Usuário criado com successo!
        </Dialog.Title>
      </div>

      <div className="mt-[60px] space-y-4 ">
        <span className="block font-medium">Senha provisória</span>
        <div className="flex w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-500 shadow-sm outline-none focus-within:border-black data-[error=true]:border-red-500 data-[readonly=true]:bg-zinc-200 data-[readonly=true]:opacity-75 dark:border-zinc-500 dark:data-[readonly=true]:bg-zinc-700">
          <input
            type="text"
            value={temporaryPassword}
            readOnly
            data-readonly={true}
            className="ring-none w-full-none flex-1 bg-transparent text-zinc-700 shadow-none outline-none placeholder:text-zinc-400 data-[readonly=true]:cursor-default dark:text-zinc-50 dark:data-[readonly=true]:text-zinc-400"
          />

          <FormComponents.Button
            variant="outline"
            className="text-xs"
            onClick={handleCopyTemporaryPassword}
          >
            {hasCopied ? 'Copiado' : 'Copiar'}
          </FormComponents.Button>
        </div>
      </div>

      <div className="mt-8 flex w-full items-center justify-end gap-2">
        <Dialog.Cancel asChild>
          <FormComponents.Button
            onClick={handleResetDialog}
            variant="ghost"
            className="font-bold"
          >
            Fechar
          </FormComponents.Button>
        </Dialog.Cancel>
      </div>
    </>
  )
}
