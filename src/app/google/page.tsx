'use client'

import { Button } from '@/components/FormComponents'
import { useSession, signOut, signIn } from 'next-auth/react'

export default function GooglePage() {
  const { data: session } = useSession()

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      {session && session.user && (
        <div className="flex flex-col items-start gap-2">
          <span>Ola, {session.user.name}</span>
          <Button onClick={() => signOut()}>Sign Out</Button>
        </div>
      )}

      {!session && (
        <Button onClick={() => signIn()}>Entrar com conta google</Button>
      )}
    </div>
  )
}
