'use client'

import { IConfig } from '@/@types/Config'
import { ConfigurationsService } from '@/lib/firebase/database/configuration-service'
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

interface ConfigContextData {
  dashConfig: IConfig
  updateDashConfig: (dashConfig: IConfig) => void
  setDashConfigInLocalStaroge(config: IConfig): void
}

export const ConfigContext = createContext<ConfigContextData>(
  {} as ConfigContextData,
)

interface ConfigContextProviderProps {
  children: ReactNode
}

const storageKey = 'VDG@DASH_CONFIG'

export const ConfigContextProvider = ({
  children,
}: ConfigContextProviderProps) => {
  const [dashConfig, setDashConfig] = useState<IConfig>({} as IConfig)

  const getConfigAndSetInLocalStorage = useCallback(async () => {
    const response = await ConfigurationsService.getDashboardConfig<IConfig>()
    setDashConfigInLocalStaroge(response)
    setDashConfig(response)
  }, [])

  const getConfigInLocalStorage = useCallback(async () => {
    if (typeof window !== 'undefined') {
      const storedInfo = localStorage.getItem(storageKey)

      if (storedInfo) {
        const parsedStoredInfo: IConfig = JSON.parse(storedInfo)

        setDashConfig(parsedStoredInfo)
      } else {
        await getConfigAndSetInLocalStorage()
      }
    }
  }, [getConfigAndSetInLocalStorage])

  function setDashConfigInLocalStaroge(config: IConfig) {
    localStorage.setItem(storageKey, JSON.stringify(config))
  }

  function updateDashConfig(config: IConfig) {
    setDashConfigInLocalStaroge(config)
    setDashConfig(config)
  }

  useEffect(() => {
    getConfigInLocalStorage()
  }, [])

  return (
    <ConfigContext.Provider
      value={{
        dashConfig,
        updateDashConfig,
        setDashConfigInLocalStaroge,
      }}
    >
      {children}
    </ConfigContext.Provider>
  )
}

export function useConfigContext() {
  const context = useContext(ConfigContext)

  return context
}
