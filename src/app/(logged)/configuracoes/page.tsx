'use client'

import { Switch } from '@/components/UI/switch'
import { HoverCard } from './components/hover-card'
import { useConfigContext } from '@/contexts/config-context'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { configurationsService } from './services'
import { toast } from 'react-toastify'
import { ConfigPageSkeleton } from './components/config-page-skeleton'
import { Button, Input } from '@/components/FormComponents'
import { ConfigForm } from './components/config-form'

export default function Configurations() {
  const queryClient = useQueryClient()
  const { setDashConfigInLocalStaroge } = useConfigContext()

  const { data, error, isLoading } = useQuery({
    queryKey: ['configurations'],
    queryFn: () => configurationsService.get('general-configurations'),
  })

  const updateConfigurationMutation = useMutation({
    mutationFn: async (data: {
      whatsappAlert: boolean
      surveyAlert: boolean
    }) => {
      await configurationsService.update({
        ...data,
        id: 'general-configurations',
        createdAt: new Date().toLocaleDateString(),
        active: true,
        timestamp: new Date().getSeconds(),
      })

      return data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['configurations'] })
      setDashConfigInLocalStaroge({
        surveyAlert: data.surveyAlert,
        whatsappAlert: data.whatsappAlert,
      })
    },
    onError: () => {
      toast.error('Erro ao salvar configurações')
    },
  })

  if (error) throw new Error('Erro ao carregar configurações')

  if (!data || isLoading) return <ConfigPageSkeleton />

  return (
    <>
      <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
        <span className="text-4xl font-bold leading-relaxed md:hidden">
          Configurações
        </span>

        <span className="block text-lg">
          Edite as configurações gerais do sistema
        </span>
      </div>

      <div className="mt-8 w-full space-y-4">
        <div className="flex w-full items-center justify-between border-b border-dashed border-zinc-200 py-2 dark:border-zinc-600">
          <div className="flex w-full items-center gap-2">
            <span>Ativar alerta de whatsapp?</span>

            <HoverCard>
              <p className="text-xs leading-relaxed">
                Ao ativar esta opção, todas as vezes que um feed for publicado
                com a opção &quot;publicar no whatsapp&quot; será exibido um
                alerta para o usuário informando que não será possível desfazer
                ou alterar o conteúdo após publicado.
              </p>
            </HoverCard>
          </div>

          <Switch
            checked={data.whatsappAlert}
            disabled={updateConfigurationMutation.isPending}
            onCheckedChange={() =>
              updateConfigurationMutation.mutate({
                surveyAlert: data.surveyAlert,
                whatsappAlert: !data.whatsappAlert,
              })
            }
          />
        </div>

        <div className="flex w-full items-center justify-between border-b border-dashed border-zinc-200 py-2 dark:border-zinc-600">
          <div className="flex w-full items-center gap-2">
            <span>Ativar alerta de enquetes?</span>

            <HoverCard>
              <p className="text-xs leading-relaxed">
                Ao ativar esta opção, todas as vezes que publicar uma enquete
                será exibido um alerta informando que a ação não poderá ser
                desfeita
              </p>
            </HoverCard>
          </div>

          <Switch
            checked={data.surveyAlert}
            disabled={updateConfigurationMutation.isPending}
            onCheckedChange={() =>
              updateConfigurationMutation.mutate({
                surveyAlert: !data.surveyAlert,
                whatsappAlert: data.whatsappAlert,
              })
            }
          />
        </div>
      </div>

      <h3 className="mt-10 text-3xl font-bold">Mercado pago</h3>

      <ConfigForm />
    </>
  )
}
