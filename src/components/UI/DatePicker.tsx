'use client'

import * as React from 'react'

import { format } from 'date-fns'
import { CalendarDays } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/UI/Button'
import { Calendar } from '@/components/UI/Calendar'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/UI/Popover'

import { ControllerRenderProps } from 'react-hook-form'

interface DatePickerProps {
  value: Date | null
  onValueChange: (data: Date) => void
}

export default function DatePicker({ onValueChange, value }: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size={'custom'}
          variant={'outline'}
          className={cn(
            'w-full items-center justify-start gap-2 rounded-lg text-left font-normal text-zinc-700 shadow-sm ',
            !value && 'text-muted-foreground',
          )}
        >
          <CalendarDays
            strokeWidth={1.5}
            className="h-5 w-5 stroke-zinc-500 dark:stroke-zinc-50"
          />
          {value ? (
            <span className="text-base text-zinc-500 dark:text-zinc-300">
              {format(value, 'dd/MM/Y')}
            </span>
          ) : (
            <span className="text-base text-zinc-500 dark:text-zinc-300">
              Selecione a data
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value ?? new Date()}
          onSelect={(data) => onValueChange(data!)}
          initialFocus
          onDayClick={() => setOpen(false)}
        />
      </PopoverContent>
    </Popover>
  )
}
