'use client'

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import Cookies from 'js-cookie'

import type { UserType } from '@/@types/Database'
import type { UserLoggedType } from '@/@types/LocalStorage'

import { useRouter, usePathname } from 'next/navigation'
import { FirstAcessDialog } from '@/components/FirstAcessDialog'

import { FirebaseAuth } from '@/lib/firebase/auth'

interface UserContextData {
  isUserLogged: boolean
  setIsUserLogged: (isUserLogged: boolean) => void
  currentUser: UserType | null
  setCurrentuser: (currentUser: UserType) => void
}

export const UserContext = createContext({} as UserContextData)

interface UserContextProviderProps {
  children: ReactNode
}

const storageKey = 'VDG@CURRENT_USER'
const policyKey = 'VDG_USER_POLICY'

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const router = useRouter()
  const currentPath = usePathname()

  const [isUserLogged, setIsUserLogged] = useState(false)
  const [currentUser, setCurrentuser] = useState<UserType | null>(null)
  const [shouldDisplayFirstAccessDialog, setShouldDisplayFirstAccessDialog] =
    useState(false)

  async function setAccessToken() {
    const accessToken = await FirebaseAuth.auth.currentUser?.getIdToken()

    if (!accessToken) {
      FirebaseAuth.signOut()
      localStorage.removeItem(storageKey)
      Cookies.remove(policyKey)
      return
    }

    Cookies.set('VDG_USER_ACCESS_TOKEN', accessToken)
  }

  const getUserInLocalStorage = useCallback(async () => {
    if (typeof window !== 'undefined') {
      const storedInfo = localStorage.getItem(storageKey)

      if (storedInfo) {
        const parsedStoredInfo: UserLoggedType = JSON.parse(storedInfo)
        FirebaseAuth.auth.onAuthStateChanged(async (user) => {
          if (user) {
            await setAccessToken()
          }
        })

        if (new Date(parsedStoredInfo.expiresIn) > new Date()) {
          setIsUserLogged(true)
          setCurrentuser(parsedStoredInfo)

          if (parsedStoredInfo.role === 'super-admin') {
            Cookies.set(
              policyKey,
              JSON.stringify([
                'news',
                'feeds',
                'events',
                'banners',
                'surveys',
                'members',
                'settings',
                'comments',
                'payments',
                'covenants',
                'notifications',
                'channels',
              ]),
            )
          } else {
            Cookies.set(policyKey, JSON.stringify(parsedStoredInfo.policy))
          }
        }

        if (parsedStoredInfo.firstAccess) {
          setShouldDisplayFirstAccessDialog(true)
        }
      } else {
        if (
          currentPath !== '/auth' &&
          currentPath !== '/google' &&
          currentPath !== '/live' &&
          currentPath !== '/privacy' &&
          currentPath !== '/apresentacao' &&
          !currentPath.includes('comentarios')
        ) {
          router.push('/auth')
        }
      }
    }
  }, [router, currentPath])

  useEffect(() => {
    if (!isUserLogged) {
      getUserInLocalStorage()
    }
  }, [isUserLogged, getUserInLocalStorage])

  return (
    <UserContext.Provider
      value={{ isUserLogged, setIsUserLogged, currentUser, setCurrentuser }}
    >
      <FirstAcessDialog
        setShouldDisplayFirstAccessDialog={setShouldDisplayFirstAccessDialog}
        shouldDisplayFirstAccessDialog={shouldDisplayFirstAccessDialog}
        user={currentUser}
      />
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  const { currentUser, isUserLogged, setCurrentuser, setIsUserLogged } =
    useContext(UserContext)

  function refreshUser(data: Partial<UserType>) {
    const storedData = localStorage.getItem(storageKey)

    if (!storedData) {
      return null
    }

    const parsedData: UserLoggedType = JSON.parse(storedData)
    const objectToUpdate = {
      ...parsedData,
      ...data,
    }

    localStorage.setItem(storageKey, JSON.stringify(objectToUpdate))
    setCurrentuser(objectToUpdate)
    Cookies.set('VDG_CURRENT_USER', JSON.stringify(objectToUpdate), {
      expires: 2, // 2 days
    })
  }

  return {
    currentUser,
    setCurrentuser,
    isUserLogged,
    setIsUserLogged,
    refreshUser,
  }
}
