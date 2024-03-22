import type { Metadata } from 'next'

import { ToastContainer } from 'react-toastify'

import { Sibdebar } from '@/components/Sidebar'
import { headers, cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import 'react-toastify/dist/ReactToastify.css'
import '@/styles/globals.css'

import { Header } from '@/components/Header'
import { ThemeProvider } from '@/ThemeProvider'
import { UserLoggedType } from '@/@types/LocalStorage'

export const metadata: Metadata = {
  title: 'VDG - Vozes do Gigante',
}

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const headersList = headers()
  const pathname = headersList.get('x-invoke-path') || ''

  const credentials = cookies().get('VDG_CURRENT_USER')
  if (!credentials) return redirect('/auth')

  const user = JSON.parse(credentials.value) as UserLoggedType

  if (pathname === '/usuarios' && user.role !== 'super-admin') {
    redirect('/banners')
  }

  return (
    <ThemeProvider>
      <ToastContainer
        autoClose={3000}
        hideProgressBar
        toastClassName="bg-white dark:bg-white text-zinc-800 dark:text-zinc-800"
        position="bottom-right"
        className="text-zinc-800 dark:text-zinc-800"
        style={{
          color: '#272725',
        }}
      />

      <div className="relative w-full antialiased">
        <Sibdebar />

        <div className="md:ml-[230px]">
          <Header />

          <main className="flex min-h-screen justify-center overflow-y-auto bg-white pt-[80px] dark:bg-zinc-900">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
