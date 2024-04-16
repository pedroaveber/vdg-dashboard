'use client'

import { ArrowUp, ArrowDown } from 'lucide-react'
import * as Form from '@/components/FormComponents'
import { Label } from '@/components/UI/label'
import React from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/UI/radio-group'
import { format, intervalToDuration } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { usersServices } from './services'
import { WalletPresenters } from './presenters'
import { Skeleton } from '@/components/skeleton'
import { GeneralPurchaseItem } from './general-purchase-item'
import { useWallet } from './hooks/use-wallet'

export function GeneralTransactions() {
  const [customDate, setCustomDate] = React.useState<Date>(new Date())
  const [daysToSearch, setDaysToSearch] = React.useState<number>(120)
  const [shouldEnableCustomDate, setShouldEnableCustomDate] =
    React.useState(false)

  const { data, isLoading, error } = useQuery({
    queryFn: async () => {
      const response = await usersServices.getAllPurchases()
      return response.map(WalletPresenters.fromAllUserPurchases)
    },
    queryKey: ['transactions-general'],
  })

  const { filterTransactions, orderTransactionsByDay } = useWallet()

  if (error)
    throw new Error('Erro ao buscar informações, tente novamente mais tarde')

  return (
    <div className="mt-8 grid w-full grid-cols-[1fr_280px] gap-4">
      <div className="flex flex-col gap-4">
        <div className="w-full space-y-4 divide-y divide-zinc-400">
          {isLoading &&
            Array.from({ length: 10 }).map((_, index) => {
              return <Skeleton className="h-10 rounded-md" key={index} />
            })}

          {data &&
            data
              .sort(orderTransactionsByDay)
              .filter((item) => filterTransactions(item, daysToSearch))
              .map((item, index) => {
                return (
                  <GeneralPurchaseItem
                    key={`purschase-item-${index}`}
                    {...item}
                  />
                )
              })}
        </div>
      </div>

      <aside className="space-y-4 divide-y divide-zinc-400 border-l px-4">
        <span className="block">Opções de busca</span>

        <RadioGroup
          className="space-y-2 pt-4"
          defaultValue={daysToSearch.toString()}
          onValueChange={(value) => setDaysToSearch(parseInt(value))}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              disabled={shouldEnableCustomDate}
              value="60"
              id="last-60-days"
            />

            <Label htmlFor="last-60-days">Últimos 60 dias</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem
              disabled={shouldEnableCustomDate}
              value="30"
              id="last-30-days"
            />

            <Label htmlFor="last-30-days">Últimos 30 dias</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem
              disabled={shouldEnableCustomDate}
              value="15"
              id="last-two-weeks"
            />

            <Label htmlFor="last-two-weeks">Últimos 15 dias</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem
              disabled={shouldEnableCustomDate}
              value="7"
              id="last-week"
            />

            <Label htmlFor="last-week">Última semana</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem
              disabled={shouldEnableCustomDate}
              value="1"
              id="today"
            />

            <Label htmlFor="today">Hoje</Label>
          </div>

          <Form.Checkbox
            label="Data personalizada"
            checked={shouldEnableCustomDate}
            onChange={(e) => setShouldEnableCustomDate(e.target.checked)}
          />
          {/* <RadioGroupItem value="MANUAL" id="today" />
                <Label htmlFor="today">Informar data</Label> */}

          {shouldEnableCustomDate && (
            <Form.Date
              id="date"
              label="Data personalizada"
              errorMessage={''}
              onValueChange={(val) => {
                const { days, months } = intervalToDuration({
                  start: new Date(val),
                  end: new Date(),
                })

                if (months && days) {
                  setDaysToSearch(days + months * 30)
                } else {
                  setDaysToSearch(days || 0)
                }
                setCustomDate(val)
              }}
              value={customDate}
            />
          )}
        </RadioGroup>
      </aside>
    </div>
  )
}
