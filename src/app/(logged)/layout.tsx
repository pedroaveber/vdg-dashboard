'use client'

import { ToastContainer } from 'react-toastify'

import { Sibdebar } from '@/components/Sidebar'

import 'react-toastify/dist/ReactToastify.css'
import '@/styles/globals.css'

import { Header } from '@/components/Header'
import { ThemeProvider } from '@/ThemeProvider'
import { useEffect, useState } from 'react'
import { FirebaseAuth } from '@/lib/firebase/auth'
import { redirect } from 'next/navigation'
import { Loader2Icon } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      FirebaseAuth.auth.onAuthStateChanged((user) => {
        if (user) {
          setIsLoading(false)
        } else {
          redirect('/auth')
        }
      })
    }
  }, [])

  return isLoading ? (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader2Icon size={64} className="animate-spin" />
    </div>
  ) : (
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
