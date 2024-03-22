'use client'

import { ThemeProvider as Theme } from 'next-themes'

interface ThemeProvidersProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProvidersProps) {
  return (
    <Theme enableSystem={false} attribute="class">
      {children}
    </Theme>
  )
}
