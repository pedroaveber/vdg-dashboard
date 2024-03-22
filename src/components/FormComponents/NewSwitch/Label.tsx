'use client'

import { useSwitch } from './Root'

interface LabelProps {
  label: string
}

export function Label({ label }: LabelProps) {
  const { customId } = useSwitch()

  return <label htmlFor={customId}>{label}</label>
}
