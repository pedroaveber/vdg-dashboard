'use client'

import { toggleItemsStatus } from '@/utils/toggle-item-status'
import { useState } from 'react'
import { toast } from 'react-toastify'
import * as Switch from '@radix-ui/react-switch'
import { RoutesType } from '@/@types/Routes'

interface ActiveInfoProps {
  id: string
  type: RoutesType
  active: boolean
}

export function StatusSwitcher({ id, active, type }: ActiveInfoProps) {
  const [isActive, setIsActive] = useState(active)
  const [isLoading, setIsLoading] = useState(false)

  async function handleToggleItemStatus() {
    setIsLoading(true)
    setIsActive((prevValue) => !prevValue)

    try {
      await toggleItemsStatus({ id, type, active })
      toast.success('Status alterado com sucesso!', {
        autoClose: 1500,
      })
    } catch {
      setIsActive((prevValue) => !prevValue)
      toast.error('Erro ao alterar status!', {
        autoClose: 1500,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Switch.Root
      defaultChecked={isActive}
      disabled={isLoading}
      data-state={isActive ? 'checked' : 'unchecked'}
      onCheckedChange={handleToggleItemStatus}
      className="relative h-6 w-12 cursor-default rounded-full bg-zinc-300 shadow-sm outline-none data-[state=checked]:bg-emerald-500 disabled:opacity-50 md:h-5 md:w-10"
    >
      <Switch.Thumb
        data-state={isActive ? 'checked' : 'unchecked'}
        className="block h-6 w-6 cursor-pointer rounded-full border border-zinc-300 bg-white shadow-sm transition-transform duration-100 data-[state=checked]:translate-x-6 md:h-[20px] md:w-[20px] md:data-[state=checked]:translate-x-5"
      />
    </Switch.Root>
  )
}
