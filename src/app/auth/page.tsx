'use client'

import { useAuthForm } from './(form)/useAuthForm'

import { ButtonSpinner } from '@/components/ButtonSpinner'
import * as FormComponents from '@/components/FormComponents'

import LogoDark from '@/assets/img/VozesDoGiganteLogoBranco.png'
import Image from 'next/image'
import { ResetPasswordDialog } from './components/ResetPasswordDialog'

export const revalidate = 0 // Dynamic Page

export default function Auth() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    signIn,
  } = useAuthForm()

  return (
    <div className="w-full max-w-[480px] space-y-3">
      <span className="hidden text-3xl font-semibold text-white md:block md:text-zinc-700">
        Login
      </span>

      <Image
        src={LogoDark}
        alt="Logo"
        width={300}
        height={200}
        className="mx-auto md:hidden"
      />

      <div className="flex w-full flex-col items-start gap-4 rounded-lg border border-zinc-300 bg-white p-6 dark:border-zinc-500">
        <form className="w-full space-y-4" onSubmit={handleSubmit(signIn)}>
          <FormComponents.Input
            label="E-mail"
            type="text"
            placeholder="Digite o seu e-mail"
            register={register('email')}
            errorMessage={errors?.email?.message}
          />

          <FormComponents.Input
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            register={register('password')}
            errorMessage={errors?.password?.message}
          />

          <FormComponents.Button
            type="submit"
            variant="primary"
            widthType="full"
            className="mt-4 flex items-center justify-center text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? <ButtonSpinner /> : 'Acessar'}
          </FormComponents.Button>
        </form>
        <ResetPasswordDialog />
      </div>
    </div>
  )
}
