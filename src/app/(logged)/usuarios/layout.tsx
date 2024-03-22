import { Metadata } from 'next/types'

interface LayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'VDG - Vozes do Gigante | Usuários',
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="my-8 flex w-full max-w-[1200px] flex-col items-center gap-4 px-4 pb-16">
      {children}
    </div>
  )
}
