'use client'

import { useRef, useState } from 'react'
import * as Dialog from '@radix-ui/react-alert-dialog'
import * as FormComponents from '@/components/FormComponents'
import { Button } from '@/components/FormComponents/Button'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FirebaseAuth } from '@/lib/firebase/auth'
import { ButtonSpinner } from '@/components/ButtonSpinner'
import { toast } from 'react-toastify'

const forgotPasswordFormSchema = z.object({
  email: z
    .string()
    .email('Informe um e-mail válido')
    .nonempty('O e-mail é obrigatório'),
})

type ForgotPasswordFormType = z.infer<typeof forgotPasswordFormSchema>

export function ResetPasswordDialog() {
  const [isOpen, setIsOpen] = useState(false)

  const { register, handleSubmit, formState } = useForm<ForgotPasswordFormType>(
    {
      resolver: zodResolver(forgotPasswordFormSchema),
      defaultValues: {
        email: '',
      },
    },
  )

  async function handleSendResetPasswordEmail({
    email,
  }: ForgotPasswordFormType) {
    try {
      await FirebaseAuth.sendPasswordResetEmail(email)
      toast.success('Link enviado para o seu e-mail!')
      setIsOpen(false)
    } catch (error: any) {
      if (error.message === 'Firebase: Error (auth/user-not-found).') {
        toast.error('Usuário não cadastrado!')
      } else {
        toast.error('Erro ao enviar o e-mail!')
      }
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger className="flex w-full items-center justify-end border-none bg-none text-sm font-bold underline">
        Esqueci minha senha
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-zinc-300 bg-white p-4 shadow-sm data-[state=open]:animate-contentShow dark:border-zinc-500 dark:bg-zinc-900 md:w-full">
          <p className="text-sm">
            Digite o seu e-mail cadastrado, o qual será enviando um link para
            redefinição de sua senha.
          </p>
          <p className="mt-2 text-sm">
            Ao enviar o e-mail, não deixe de conferir seu lixo eletrônico e sua
            caixa de spam.
          </p>
          <form
            id="reset-password"
            className="mt-4 flex w-full flex-col items-start gap-4"
            onSubmit={handleSubmit(handleSendResetPasswordEmail)}
          >
            <FormComponents.Input
              label="E-mail"
              type="email"
              register={register('email')}
              errorMessage={formState.errors?.email?.message}
              placeholder="Digite o seu e-mail cadstrado"
            />
          </form>

          <div className="mt-8 flex w-full items-center justify-end gap-2">
            <Dialog.Cancel>
              <Button variant="ghost" className="font-bold">
                Fechar
              </Button>
            </Dialog.Cancel>

            <Button
              form="reset-password"
              variant="primary"
              className="font-bold"
              type="submit"
              disabled={formState.isSubmitting}
            >
              {formState.isSubmitting ? <ButtonSpinner /> : 'Enviar'}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
