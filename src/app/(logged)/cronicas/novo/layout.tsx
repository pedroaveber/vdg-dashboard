import { Metadata } from 'next/types'

interface LayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'VDG - Vozes do Gigante | Nova Crônica',
}

export default function Layout({ children }: LayoutProps) {
  return <>{children}</>
}
