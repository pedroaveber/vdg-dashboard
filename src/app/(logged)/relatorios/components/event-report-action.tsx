'use client'

import React from 'react'
import { EventType } from '@/@types/Database'
import { EventsService } from '@/lib/firebase/database/events-service'
import { toast } from 'react-toastify'
import { EventDialog } from './event-dialog'
import { PlayCircle, Hourglass } from 'lucide-react'
import { RiFilePdf2Fill } from 'react-icons/ri'

type Events = {
  id: string
  title: string
}

const eventMapper = (event: EventType): Events => {
  return {
    id: event.id,
    title: event.title,
  }
}

export function EventReportAction() {
  const [isGenerating, setIsGenerating] = React.useState<boolean>(false)
  const [executed, setExecuted] = React.useState<boolean>(false)
  const [events, setEvents] = React.useState<Events[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [shouldOpenDialog, setShouldOpenDialog] = React.useState(false)
  const [selectedEvent, setSelectedEvent] = React.useState<string | null>(null)

  async function generateEventReport() {
    try {
      setShouldOpenDialog(false)
      setIsGenerating(true)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setExecuted(true)
      setIsGenerating(false)
    } catch (error) {
      console.log(error)
      toast.error('Erro ao gerar relatório')
    }
  }

  React.useEffect(() => {
    async function getEvents() {
      try {
        setIsLoading(true)
        const { documents } = await EventsService.getAllDocuments<EventType>()
        const onlyActiveAndPaymentManagedEvents = documents.filter(
          (event) => event.active && event.paymentManagement,
        )
        setEvents(onlyActiveAndPaymentManagedEvents.map(eventMapper))
      } catch (error) {
        console.log(error)
        toast.error('Erro ao carregar eventos')
      } finally {
        setIsLoading(false)
      }
    }

    getEvents()
  }, [])

  return (
    <div className="flex w-full items-center justify-between border-b border-dashed border-zinc-300 py-4 data-[status=disabled]:opacity-50 dark:border-zinc-600">
      <span>Gerar relatório de pagamentos de eventos</span>

      {isGenerating ? (
        <Hourglass size={20} className="animate-spin" />
      ) : executed ? (
        <button className="group" title="Exportar em PDF">
          <RiFilePdf2Fill
            size={24}
            className="text-zinc-700 transition-colors group-hover:text-red-500 dark:text-zinc-50"
          />
        </button>
      ) : (
        <EventDialog
          events={events}
          generateEventReport={generateEventReport}
          isLoading={isLoading}
          open={shouldOpenDialog}
          setOpen={setShouldOpenDialog}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        >
          <button className="group" title="Executar relatório">
            <PlayCircle className="stroke-zinc-700 transition-colors group-enabled:group-hover:stroke-red-500 dark:stroke-zinc-50" />
          </button>
        </EventDialog>
      )}
    </div>
  )
}
