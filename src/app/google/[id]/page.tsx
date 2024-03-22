'use client'

import { api } from '@/lib/api'
import { signIn, useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'

import { UserService } from '@/lib/firebase/database/user-service'

type GooglePageParams = {
  params: {
    id: string
  }
}

export default function GooglePage({ params }: GooglePageParams) {
  const userId = params.id
  const { data: session, status } = useSession()
  const [fetchingState, setFetchingState] = useState<
    'loading' | 'success' | 'failure'
  >('loading')

  // @ts-ignore
  const accessToken: string = session?.accessToken

  // async function updateUserData() {
  //   await Promise.all([
  //     api('/google-oauth/create', {
  //       code: accessToken,
  //       platform: 'web',
  //     }),

  //     UserService.updateUserById({
  //       id: userId,
  //       data: {
  //         youtubeEmail: session?.user?.email,
  //         hasFailed: false,
  //       },
  //     }),
  //   ])

  //   setFetchingState('success')
  // }

  // const generateAccessTokenAndConnectToUserAccount = useCallback(async () => {
  //   if (status !== 'loading') {
  //     const { data: userInfo } = await api.post('/query', {
  //       collection: 'users',
  //       fieldToSearch: 'youtubeEmail',
  //       valueToSearch: session?.user?.email,
  //     })

  //     if (!userInfo.status) {
  //       await updateUserData()
  //     } else {
  //       const user = userInfo.data[0]
  //       const isTheSameUser = user.id === userId

  //       if (isTheSameUser) {
  //         await updateUserData()
  //       } else {
  //         setFetchingState('failure')
  //         UserService.updateUserById({
  //           id: userId,
  //           data: {
  //             hasFailed: true,
  //           },
  //         })
  //       }
  //     }
  //   }
  // }, [status])

  // useEffect(() => {
  //   if (status === 'loading') return

  //   if (status === 'authenticated') {
  //     generateAccessTokenAndConnectToUserAccount()
  //   } else {
  //     signIn()
  //   }
  // }, [status])

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <span>TODO</span>
      {/* <span>
        {fetchingState === 'loading'
          ? 'Realizando login com google...'
          : fetchingState === 'failure'
          ? 'Conta do Youtube já sincronizada com outro usuário!'
          : 'Conta do Youtube atualizada com sucesso!'}
      </span> */}
    </div>
  )
}
