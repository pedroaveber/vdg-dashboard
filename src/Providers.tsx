'use client'

import { SessionProvider } from 'next-auth/react'
import { ConfigContextProvider } from './contexts/config-context'
import { MobileHeaderContextProvider } from './contexts/mobile-header-context'
import { UserContextProvider } from './contexts/UserContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ConfigContextProvider>
          <MobileHeaderContextProvider>
            <UserContextProvider>{children}</UserContextProvider>
          </MobileHeaderContextProvider>
        </ConfigContextProvider>
      </SessionProvider>
    </QueryClientProvider>
  )
}
