'use client'

import {
  ComponentProps,
  createContext,
  ReactNode,
  useContext,
  useId,
} from 'react'

import { twMerge } from 'tailwind-merge'

interface SwitchContextData {
  customId: string
}

interface SwitchContextProviderProps {
  children: ReactNode
}

export function Root({ className, ...rest }: ComponentProps<'div'>) {
  return (
    <SwitchContenxtProvider>
      <div
        className={twMerge(
          'flex w-full items-center justify-between gap-4 py-2 font-medium md:justify-end md:gap-2',
          className,
        )}
        {...rest}
      />
    </SwitchContenxtProvider>
  )
}

const SwitchContext = createContext<SwitchContextData>({} as SwitchContextData)

const SwitchContenxtProvider = ({ children }: SwitchContextProviderProps) => {
  const customId = useId()

  return (
    <SwitchContext.Provider value={{ customId }}>
      {children}
    </SwitchContext.Provider>
  )
}

export function useSwitch() {
  const context = useContext(SwitchContext)
  return context
}
