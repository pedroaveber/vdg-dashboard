import { Metadata } from 'next/types'

import '@/styles/globals.css'

interface LayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'VDG - Vozes do Gigante | Comentário ao Vivo',
}

export default function Layout({ children }: LayoutProps) {
  return <>{children}</>
}
