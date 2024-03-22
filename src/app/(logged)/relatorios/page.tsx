'use client'

import { Hourglass, PlayCircle } from 'lucide-react'
import { RiFilePdf2Fill } from 'react-icons/ri'

import { useState } from 'react'
import { EventReportAction } from './components/event-report-action'

export default function Reports() {
  return (
    <section className="mt-8 flex w-full max-w-[1200px] flex-col gap-2 px-4 pb-24">
      <EventReportAction />

      <ReportAction
        disabled
        reportDescription="Gerar relatório de membros inadimplentes"
      />

      <ReportAction
        disabled
        reportDescription="Gerar relatório de parcelas pendentes"
      />

      <ReportAction
        disabled
        reportDescription="Gerar relatório de produtos vendidos"
      />

      <ReportAction
        disabled
        reportDescription="Gerar relatório de cupons utilizados"
      />
    </section>
  )
}

function ReportAction({
  reportDescription,
  disabled = false,
}: {
  reportDescription: string
  disabled?: boolean
}) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [executed, setExecuted] = useState(false)

  async function executeReport() {
    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setExecuted(true)
    setIsGenerating(false)
  }

  return (
    <div
      data-status={disabled ? 'disabled' : 'active'}
      className="flex w-full items-center justify-between border-b border-dashed border-zinc-300 py-4 data-[status=disabled]:opacity-50 dark:border-zinc-600"
    >
      <span>{reportDescription}</span>

      {isGenerating ? (
        <Hourglass size={20} className="animate-spin" />
      ) : executed ? (
        <button
          className="group"
          onClick={executeReport}
          title="Exportar em PDF"
        >
          <RiFilePdf2Fill
            size={24}
            className="text-zinc-700 transition-colors group-hover:text-red-500 dark:text-zinc-50"
          />
        </button>
      ) : (
        <button
          className="group"
          onClick={executeReport}
          disabled={disabled}
          title="Executar relatório"
        >
          <PlayCircle className="stroke-zinc-700 transition-colors group-enabled:group-hover:stroke-red-500 dark:stroke-zinc-50" />
        </button>
      )}
    </div>
  )
}
