'use client'

import * as Dialog from '@radix-ui/react-alert-dialog'

import { Button } from '@/components/FormComponents/Button'

import type { SurveyType } from '@/@types/Database'

interface SurveyLineChartProps {
  survey: SurveyType
}

export function SurveyLineChart({ survey }: SurveyLineChartProps) {
  const totalVotes = survey.options.reduce((acc, curr) => acc + curr.votes, 0)

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          variant="outline"
          className="flex w-full items-center justify-center px-2 py-2 text-base md:w-auto md:py-1 md:text-sm"
        >
          Resultados
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-zinc-300 bg-white p-4 shadow-sm data-[state=open]:animate-contentShow dark:border-zinc-500 dark:bg-zinc-900 md:w-full">
          <Dialog.Title className="text-lg font-bold text-zinc-700 dark:text-zinc-50">
            {survey.question}
          </Dialog.Title>

          <Dialog.Description className="mt-8 max-h-[300px] space-y-4 overflow-y-auto pr-8">
            {survey.options.map((option) => {
              return (
                <OptionResultsBarChart
                  key={option.value}
                  option={option}
                  title={option.value}
                  totalVotes={totalVotes}
                />
              )
            })}
          </Dialog.Description>

          <div className="mt-8 flex w-full items-center justify-end gap-2">
            <Dialog.Cancel>
              <Button variant="ghost" className="font-bold">
                Fechar
              </Button>
            </Dialog.Cancel>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

interface OptionResultsBarChartProps {
  title: string
  option: {
    value: string
    votes: number
  }
  totalVotes: number
}

function OptionResultsBarChart({
  title,
  option,
  totalVotes,
}: OptionResultsBarChartProps) {
  const percentage = Math.ceil((option.votes / totalVotes) * 100)
  const percentageToDisplay = `${percentage.toFixed(2)} %`

  const noneVotesYet = totalVotes === 0

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-10 w-full flex-1 rounded-md border border-zinc-300">
        <div
          className="h-full rounded-r bg-zinc-500/20 dark:bg-zinc-200/10"
          style={{
            width: `${percentage}%`,
          }}
        />
        <span className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 font-bold">
          {title}
        </span>
      </div>

      {noneVotesYet ? (
        <span className="block text-xs font-bold">Nenhum voto</span>
      ) : (
        <div className="space-y-1">
          <span className="block text-xs font-bold">{percentageToDisplay}</span>
          <span className="block text-xs font-bold">{option.votes} votos</span>
        </div>
      )}
    </div>
  )
}
