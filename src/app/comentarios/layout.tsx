import { Metadata } from 'next'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Vozes do Gigante - Comentários',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
