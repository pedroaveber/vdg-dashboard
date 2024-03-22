import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Metadata } from 'next/types'

interface LayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'VDG - Vozes do Gigante | Eventos',
}

export default function Layout({ children }: LayoutProps) {
  const policy = cookies().get('VDG_USER_POLICY')

  if (policy) {
    const parsedPolicy = JSON.parse(policy.value) as string[]

    if (!parsedPolicy.includes('events')) {
      redirect('/')
    }
  }

  return (
    <div className="my-8 flex w-full max-w-[1200px] flex-col px-4 pb-16">
      {children}
    </div>
  )
}
