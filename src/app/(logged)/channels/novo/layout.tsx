import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Metadata } from 'next/types'

interface LayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'VDG - Vozes do Gigante | Novo Channel',
}

export default function Layout({ children }: LayoutProps) {
  // const policy = cookies().get('VDG_USER_POLICY')

  // if (policy) {
  //   const parsedPolicy = JSON.parse(policy.value) as string[]

  //   if (!parsedPolicy.includes('channels')) {
  //     redirect('/')
  //   }
  // }
  return <>{children}</>
}
