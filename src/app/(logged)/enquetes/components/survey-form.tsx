'use client'

import { useEffect, useState } from 'react'
import { useMasks } from '@/hooks/useMasks'
import { useSurveyForm } from '../hooks/use-survey-form'
import { useFieldArray } from 'react-hook-form'
import { Trash } from 'lucide-react'
import type { SurveyType } from '@/@types/Database'
import { SurveyService } from '@/lib/firebase/database/surveys-service'
import { FootballApi } from '@/lib/football-api'
import type { IMatch } from '@/@types/FootballApi'
import { Anchor } from '@/components/Anchor'
import * as FormComponents from '@/components/FormComponents'
import { createNextMonthDate } from '@/utils/create-next-month-date'
import { getDateThreeDaysBeforeToday } from '@/utils/get-date-three-days-before-today'
import { SurveyAlertDialog } from './survey-alert-dialog'

interface SurveyFormProps {
  prevValues?: SurveyType | null
}

export function SurveyForm({ prevValues = null }: SurveyFormProps) {
  const surveyOptionsDefaultValue = {
    '0': false,
    '1': false,
  }

  const surveyOptionsInitialValues: Record<string, boolean> | null =
    prevValues && {
      ...prevValues.options.reduce((acc, option, index) => {
        return {
          ...acc,
          [index]: option.value !== '',
        }
      }, {}),
    }
  const [matches, setMatches] = useState<Array<IMatch> | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [surveyOptions, setSurveyOptions] = useState<Record<string, boolean>>(
    surveyOptionsInitialValues || surveyOptionsDefaultValue,
  )

  const {
    watch,
    control,
    setValue,
    register,
    formState,
    saveSurvey,
    handleSubmit,
    defaultValues,
    saveAndPublishSurvey,
  } = useSurveyForm({ prevValues })

  const { errors, isSubmitting } = formState

  const { createHourMask } = useMasks()

  const defaultOptionValue = { value: '', votes: 0 }

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  })

  function handleRemoveCurrentField(index: number) {
    remove(index)

    setSurveyOptions((prevState) => {
      const newState = { ...prevState }
      delete newState[index]

      return newState
    })
  }

  function handleAppendNewFieldOnValueChange(
    currentValue: string,
    currentIndex: number,
  ) {
    setValue(`options.${currentIndex}.value`, currentValue)

    if (
      currentValue !== '' &&
      watch('options').length === currentIndex + 1 &&
      currentIndex < 4
    ) {
      append(defaultOptionValue, {
        focusIndex: currentIndex,
      })

      setSurveyOptions((prevState) => {
        return {
          ...prevState,
          [currentIndex]: false,
        }
      })
    }
  }

  function handleDisplayRemoveFieldOnBlur(index: number) {
    if (watch('options')[index]?.value !== '') {
      setSurveyOptions((prevState) => {
        return {
          ...prevState,
          [index]: true,
        }
      })
    }
  }

  async function getNextMatches() {
    const threeDaysBefore = SurveyService.DateService.createCustomDate({
      date: getDateThreeDaysBeforeToday(),
      dateFormat: 'yyyy-MM-dd',
    })

    const nextMonth = SurveyService.DateService.createCustomDate({
      dateFormat: 'yyyy-MM-dd',
      date: createNextMonthDate(),
    })

    setIsLoading(true)
    try {
      const response = await FootballApi.getNextMatches({
        endDate: nextMonth,
        initialDate: threeDaysBefore,
      })

      setMatches(response)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const shouldDisplayRemoveOptionButton = watch('options').length > 2
  const shouldDisplayMatchesSelect = watch('associateFootball')

  useEffect(() => {
    if (prevValues?.associatedMatchId) {
      getNextMatches()
    }
  }, [prevValues])

  return (
    <form
      className="flex w-full flex-col gap-4 pb-24"
      onSubmit={handleSubmit(saveSurvey)}
    >
      <FormComponents.Input
        label="Pergunta"
        type="text"
        placeholder="Inisira uma pergunta para a enquete"
        register={register('question')}
        errorMessage={errors.question?.message}
      />

      <span className="-mb-4 block font-medium text-zinc-700 dark:text-zinc-50">
        Enquete
      </span>

      {fields.map((field, index) => {
        return (
          <div className="flex w-full items-end gap-6" key={field.id}>
            <FormComponents.Input
              label=""
              type="text"
              placeholder="+ Adicionar opção para a enquete"
              register={register(`options.${index}.value`)}
              onChange={(e) => {
                const { value } = e.target
                handleAppendNewFieldOnValueChange(value, index)
              }}
              onBlur={() => handleDisplayRemoveFieldOnBlur(index)}
            />

            {shouldDisplayRemoveOptionButton && surveyOptions[index] && (
              <FormComponents.Button
                variant="danger"
                type="button"
                className="py-[11px]"
                onClick={() => handleRemoveCurrentField(index)}
              >
                <Trash className="h-5 w-5 stroke-zinc-50" strokeWidth={1.5} />
              </FormComponents.Button>
            )}
          </div>
        )
      })}

      {errors.options?.root?.message && (
        <p className="text-xs font-semibold text-red-500">
          {errors.options.root.message}
        </p>
      )}

      <FormComponents.Select.Root
        label="Privacidade"
        placeholder="Selecione um item"
        defaultValue={defaultValues?.privacy}
        onValueChange={(
          value: 'VIP_MEMBERS_ONLY' | 'PUBLIC' | 'MEMBERS_ONLY' | 'REGISTEREDS',
        ) => setValue('privacy', value)}
      >
        <FormComponents.Select.Item value="PUBLIC" text="Pública" />

        <FormComponents.Select.Item
          value="REGISTEREDS"
          text="Somente para cadastrados"
        />

        <FormComponents.Select.Item
          value="MEMBERS_ONLY"
          text="Somente para membros"
        />

        <FormComponents.Select.Item
          value="VIP_MEMBERS_ONLY"
          text="Somenete para membros VIP"
        />
      </FormComponents.Select.Root>

      <div className="grid w-full grid-cols-2 gap-4">
        <FormComponents.Date
          onValueChange={(value) => setValue('validityDate', value)}
          value={watch('validityDate') || new Date()}
          id="date"
          label="Data de validade"
          errorMessage={errors.validityDate?.message}
        />

        <FormComponents.Input
          type="text"
          label="Horário da validade"
          placeholder="Digite a hora da validade"
          register={register('validityHour')}
          value={createHourMask(watch('validityHour')) || ''}
          maxLength={5}
          errorMessage={errors.validityHour?.message as string}
        />
      </div>

      <FormComponents.Switch
        label="Associar enquete a um jogo"
        onCheckedChange={(state) => {
          if (!state) {
            setValue('associatedMatchId', null)
          }

          if (state && !matches) {
            getNextMatches()
          }

          setValue('associateFootball', !watch('associateFootball'))
        }}
        defaultChecked={defaultValues?.associateFootball}
      />

      {!isLoading && shouldDisplayMatchesSelect && matches && (
        <FormComponents.Select.Root
          placeholder="Selecione um jogo"
          label="Selecione um jogo"
          defaultValue={defaultValues?.associatedMatchId ?? undefined}
          onValueChange={(value) => setValue('associatedMatchId', value)}
        >
          {matches.map((match) => {
            return (
              <FormComponents.Select.Item
                key={match.match_id}
                text={`${match.league_name}: ${match.match_hometeam_name} x ${match.match_awayteam_name}`}
                value={match.match_id}
              />
            )
          })}
        </FormComponents.Select.Root>
      )}

      {watch('associateFootball') && errors?.associatedMatchId?.message && (
        <p className="text-xs font-semibold text-red-500">
          {errors.associatedMatchId.message}
        </p>
      )}

      {shouldDisplayMatchesSelect && isLoading && (
        <FormComponents.Select.Skeleton />
      )}

      <div className="flex w-full flex-1 flex-col items-center justify-end gap-2 md:flex-row">
        <Anchor variant="outline" href="/enquetes" className="w-full md:w-auto">
          Voltar
        </Anchor>

        <FormComponents.Button
          type="submit"
          disabled={isSubmitting}
          variant="outline"
          className="flex w-full items-center justify-center py-3 md:w-auto md:py-2"
        >
          Salvar
        </FormComponents.Button>

        <SurveyAlertDialog
          handleSubmit={handleSubmit(saveAndPublishSurvey)}
          isSubmitting={isSubmitting}
        >
          <FormComponents.Button
            type="button"
            variant="primary"
            className="flex w-full items-center justify-center py-3 md:w-auto md:py-2"
          >
            Publicar e salvar
          </FormComponents.Button>
        </SurveyAlertDialog>
      </div>
    </form>
  )
}
