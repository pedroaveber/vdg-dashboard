'use client'

// Core
import { useState } from 'react'

// Assets
import { Check, Clock } from 'lucide-react'

// Types
import type { SurveyType } from '@/@types/Database'

// Hooks
import { useConfigContext } from '@/contexts/config-context'
import { useMutation, useQueryClient } from '@tanstack/react-query'

// Components
import { Anchor } from '@/components/Anchor'
import { Button } from '@/components/FormComponents'
import { SurveyLineChart } from './survey-line-chart'
import { SurveyAlertDialog } from './survey-alert-dialog'
import { SurveyDeleteDialog } from './survey-delete-dialog'

// Libs
import { toast } from 'react-toastify'

// Services
import { surveyServices } from '../services'

export function SurveyItem(props: SurveyType) {
  const queryClient = useQueryClient()
  const { dashConfig } = useConfigContext()

  const [shouldDisplayDeleteDialog, setShouldDisplayDeleteDialog] =
    useState(false)

  const { mutateAsync: toggleSurveyStatusFn } = useMutation({
    mutationFn: async () => {
      await surveyServices.update({
        ...props,
        active: true,
      })
    },
    onMutate: () => {
      const cached = queryClient.getQueryData<SurveyType[]>(['surveys-general'])

      queryClient.setQueryData<SurveyType[]>(['surveys-general'], (prev) => {
        if (!prev) return []

        return prev.map((item) => {
          if (item.id === props.id) {
            return {
              ...item,
              active: true,
            }
          }

          return item
        })
      })

      return cached
    },
    onError: (_, __, cached) => {
      queryClient.setQueryData<SurveyType[]>(['surveys-general'], cached)
      toast.error('Erro ao publicar enquete')
    },
  })

  const isSurveyAlertEnabled = dashConfig.surveyAlert

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-zinc-300 p-2 dark:border-zinc-500 md:p-4">
      <div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:gap-4">
        <p className="text-lg font-bold md:w-[500px] md:truncate md:text-base">
          {props.question}
        </p>

        {props.active ? (
          <div className="mb-2 ml-auto flex w-full items-center justify-start gap-2 md:m-0">
            <Check size={14} className="stroke-green-500" strokeWidth={1.5} />

            <span className="text-xs text-zinc-500 dark:text-zinc-300">
              Publicado
            </span>
          </div>
        ) : (
          <div className="mb-2 ml-auto flex w-full items-center justify-start gap-2 md:m-0">
            <Clock size={14} className="stroke-orange-500" strokeWidth={1.5} />

            <span className="w-full text-xs text-zinc-500 dark:text-zinc-300">
              Aguardando
            </span>
          </div>
        )}

        <div className="flex w-full flex-col items-center gap-2 md:flex-row md:justify-end">
          {!props.active && (
            <Anchor
              href={`/enquetes/editar/${props.id}`}
              variant="outline"
              className="flex w-full items-center justify-center px-2 py-2 text-base md:w-auto md:py-1 md:text-sm"
            >
              Editar
            </Anchor>
          )}

          {props.active && <SurveyLineChart survey={props} />}

          {!props.active && isSurveyAlertEnabled && (
            <SurveyAlertDialog
              isSubmitting={false}
              handleSubmit={() => toggleSurveyStatusFn()}
            >
              <Button
                variant="primary"
                widthType="full"
                className="flex items-center justify-center gap-1 py-2  text-base font-bold md:w-auto md:py-1 md:text-sm"
              >
                Publicar
              </Button>
            </SurveyAlertDialog>
          )}

          {!props.active && !isSurveyAlertEnabled && (
            <Button
              onClick={() => toggleSurveyStatusFn()}
              variant="primary"
              widthType="full"
              className="flex items-center justify-center gap-1 py-2  text-base font-bold md:w-auto md:py-1 md:text-sm"
            >
              Publicar
            </Button>
          )}

          <SurveyDeleteDialog
            id={props.id}
            open={shouldDisplayDeleteDialog}
            setOpen={setShouldDisplayDeleteDialog}
          >
            <Button
              variant="danger"
              widthType="full"
              className="flex items-center justify-center gap-1 py-2  text-base font-bold md:w-auto md:py-1 md:text-sm"
            >
              Excluir
            </Button>
          </SurveyDeleteDialog>
        </div>
      </div>
    </div>
  )
}
