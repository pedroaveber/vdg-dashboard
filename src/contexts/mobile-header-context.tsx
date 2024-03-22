'use client'

import { createContext, useContext, useState } from 'react'

interface MobileHeaderContextProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

interface MobileHeaderContextProviderProps {
  children: React.ReactNode
}

export const MobileHeaderContext = createContext({} as MobileHeaderContextProps)

export const MobileHeaderContextProvider = ({
  children,
}: MobileHeaderContextProviderProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <MobileHeaderContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </MobileHeaderContext.Provider>
  )
}

export function useMobileHeader() {
  const { setIsOpen, isOpen } = useContext(MobileHeaderContext)

  function handleClose() {
    setIsOpen(false)
  }

  function handleOpen() {
    setIsOpen(true)
  }

  return {
    isOpen,
    handleOpen,
    handleClose,
  }
}
