'use client'

import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { usersServices } from '../usuarios/services'
import { Input, Button } from '@/components/FormComponents'
import { Anchor } from '@/components/Anchor'
import { ButtonSpinner } from '@/components/ButtonSpinner'
import { Avatar } from './components/avatar'
import { useProfileForm } from './form/useProfileForm'
import { Skeleton } from '@/components/skeleton'

export default function Profile() {
  const params = useSearchParams()
  const userId = params.get('id')

  const { data, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => usersServices.get(userId || ''),
  })

  const {
    watch,
    errors,
    handleSubmit,
    isSubmitting,
    register,
    setValue,
    updateUserProfile,
  } = useProfileForm({
    user: data,
  })

  if (error) {
    throw new Error('Erro ao carregar informações do usuário')
  }

  return (
    <form
      className="mx-auto my-8 flex w-full max-w-[632px] flex-col justify-start gap-4 px-4 md:grid md:grid-cols-[250px_1fr]"
      onSubmit={handleSubmit(updateUserProfile)}
    >
      {isLoading ? (
        <>
          <Skeleton className="h-[200px] w-[200px] rounded-full" />

          <div className="mt-8 flex w-full flex-col items-start gap-4">
            <Skeleton className="h-[50px] w-[100%]" />
            <Skeleton className="h-[50px] w-[100%]" />
          </div>
        </>
      ) : (
        <>
          <div>
            <Avatar
              setImagePreview={(previewUrl) => setValue('avatar', previewUrl)}
              imagePreview={watch('avatar') || data?.avatar}
              errorMessage={errors.avatar?.message as string}
            />
          </div>

          <div className="flex w-full flex-col items-start gap-4">
            <Input
              label="Nome"
              type="text"
              placeholder="Digite o seu nome"
              register={register('name')}
              errorMessage={errors.name?.message}
            />

            <Input
              label="E-mail"
              type="email"
              readOnly
              register={register('email')}
              errorMessage={errors.email?.message}
            />

            <div className="mt-8 flex w-full flex-col items-center justify-end gap-2 md:flex-row">
              <Anchor
                variant="outline"
                href="/banners"
                className="w-full md:w-auto"
              >
                Voltar
              </Anchor>

              <Button
                disabled={isSubmitting}
                type="submit"
                variant="primary"
                className="flex w-full items-center justify-center py-3 md:w-auto md:py-2"
              >
                {isSubmitting ? <ButtonSpinner /> : 'Salvar alterações'}
              </Button>
            </div>
          </div>
        </>
      )}
    </form>
  )
}
