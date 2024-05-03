'use client'

import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { AuthFormSchema } from './AuthFormSchema'
import type { AuthFormType } from './AuthFormSchema'

import Cookie from 'js-cookie'

import { toast } from 'react-toastify'

import { FirebaseAuth } from '@/lib/firebase/auth'
import { authService } from '../services'

import { getTwoDaysAfterToday } from '@/utils/create-two-days-after-today'

import { useUserContext } from '@/contexts/UserContext'

import type { UserLoggedType } from '@/@types/LocalStorage'
import { routes } from '@/utils/get-route-by-policy'

export function useAuthForm() {
  const { setIsUserLogged, setCurrentuser } = useUserContext()
  const { formState, handleSubmit, register } = useForm<AuthFormType>({
    resolver: zodResolver(AuthFormSchema),
  })

  const router = useRouter()

  async function signIn({ email, password }: AuthFormType) {
    try {
      const session = await FirebaseAuth.signInWithEmailAndPassword({
        email,
        password,
      })

      const accessToken = await session.user.getIdToken()

      if (accessToken) {
        Cookie.set('VDG_USER_ACCESS_TOKEN', accessToken)
      } else {
        throw new Error('Não foi possível obter o token de acesso')
      }

      const user = await authService.getUserByEmail({
        email,
        accessToken,
      })

      if (!user || user.role === 'user') {
        toast.error('Usuário não autorizado!')
        return
      }

      setIsUserLogged(true)
      setCurrentuser(user)

      const userPolicies = user.policy
      const todayMoreTwoDays = getTwoDaysAfterToday()

      const objectToStorage: UserLoggedType = {
        ...user,
        expiresIn: todayMoreTwoDays,
      }

      Cookie.set('VDG_CURRENT_USER', JSON.stringify(objectToStorage), {
        expires: 2, // 2 days
      })

      localStorage.setItem('VDG@CURRENT_USER', JSON.stringify(objectToStorage))
      localStorage.setItem('@vdg-dashboard:current-user-email:v1.0.0', email)
      toast.success('Login realizado com sucesso')

      if (user.role === 'super-admin') {
        router.push('/banners')
      } else {
        router.push(routes[userPolicies[0]])
      }
    } catch (error: any) {
      console.log(error)
      toast.error('E-mail ou senha inválidos')
    }
  }

  return {
    formState,
    register,
    handleSubmit,
    signIn,
  }
}
