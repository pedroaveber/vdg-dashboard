import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'VDG - Vozes do Gigante | Banners',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const policy = cookies().get('VDG_USER_POLICY')

  if (policy) {
    const parsedPolicy = JSON.parse(policy.value) as string[]

    if (!parsedPolicy.includes('banners')) {
      redirect('/')
    }
  }

  return (
    <div className="mt-8 flex w-full max-w-[1200px] flex-col px-4 pb-24">
      {children}
    </div>
  )
}
