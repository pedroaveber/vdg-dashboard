import type { Metadata } from 'next'
import { ToastContainer } from 'react-toastify'

import Image from 'next/image'
import Logo from '@/assets/img/VozesDoGiganteSecundarioBranco.png'

import 'react-toastify/dist/ReactToastify.css'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Vozes do Gigante - Autenticação',
}

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="grid min-h-screen w-full grid-cols-1 bg-auth bg-cover bg-center antialiased md:grid-cols-2 md:bg-white md:bg-none">
      <div className="hidden h-screen w-full items-center justify-center bg-auth bg-cover bg-center md:flex">
        <Image
          src={Logo}
          width={350}
          height={600}
          alt="Logo Vozes do gigante"
        />
      </div>

      <div className="flex w-full items-center justify-center px-4">
        {children}
      </div>

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
    </main>
  )
}
