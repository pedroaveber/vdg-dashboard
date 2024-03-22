import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'VDG - Vozes do Gigante',
}

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return children
}
