'use client'

import Cookies from 'js-cookie'

import { LogOut } from 'lucide-react'

import { Button } from './FormComponents'

import { FirebaseAuth } from '@/lib/firebase/auth'

import { toast } from 'react-toastify'
import { useContext } from 'react'
import { UserContext } from '@/contexts/UserContext'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'

export function SignOut() {
  const { setIsUserLogged } = useContext(UserContext)
  const { setTheme } = useTheme()
  const router = useRouter()

  async function handleSignOut() {
    try {
      localStorage.removeItem('VDG@CURRENT_USER')
      localStorage.removeItem('theme')
      Cookies.remove('VDG_CURRENT_USER')
      Cookies.remove('VDG_USER_ACCESS_TOKEN')
      Cookies.remove('VDG_USER_POLICY')
      setIsUserLogged(false)
      FirebaseAuth.signOut()
      router.push('/auth')
      toast.success('Deslogado com sucesso!')
      setTheme('light')
    } catch (error) {
      toast.error('Erro ao deslogar, tente novamente mais tarde.')
    }
  }

  return (
    <Button
      onClick={handleSignOut}
      variant="ghost"
      title="Sair da conta"
      widthType="full"
      className="gap-4 rounded-none bg-white p-4 enabled:hover:bg-white dark:bg-zinc-900"
    >
      <LogOut
        strokeWidth={1.5}
        className="h-6 w-6 rotate-180 stroke-zinc-700 dark:stroke-zinc-50"
      />
      <span className="font-regular">Sair</span>
    </Button>
  )
}
