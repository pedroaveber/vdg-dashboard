import { Roboto } from 'next/font/google'
import type { Metadata } from 'next'

import '@/styles/globals.css'
import { Providers } from '@/Providers'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '300', '900'],
})

export const metadata: Metadata = {
  title: 'VDG - Vozes do Gigante',
}

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="pt-BR">
      <Providers>
        <body className={`${roboto.className} flex min-h-screen w-screen`}>
          {children}
        </body>
      </Providers>
    </html>
  )
}
