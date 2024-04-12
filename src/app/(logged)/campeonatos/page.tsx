'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getLeagues } from './services/get-leagues'
import { Skeleton } from '@/components/skeleton'
import Image from 'next/image'
import { Switch } from '@/components/UI/switch'
import { DatabaseCoreType } from '@/@types/Database'
import { leagueServices } from './services'
import { toast } from 'react-toastify'

const baseObject: DatabaseCoreType = {
  id: 'visible-leagues',
  active: true,
  createdAt: new Date().toISOString(),
  timestamp: Date.now(),
}

export default function TournamentsPage() {
  const queryClient = useQueryClient()

  const { data: leagues, isLoading: isLoadingLeagues } = useQuery({
    queryFn: getLeagues,
    queryKey: ['leagues'],
  })

  const { data: visibleLeagues, isLoading: isLoadingVisibleLeagues } = useQuery(
    {
      queryFn: async () => await leagueServices.get(baseObject.id),
      queryKey: ['visible-leagues'],
      retry: true,
      retryDelay: 500, // 500ms
    },
  )

  const { mutateAsync: toggleLeagueVisibilityFn } = useMutation({
    mutationFn: async (data: string) => {
      const isLeagueVisible = visibleLeagues?.data.includes(data)
      const payload = isLeagueVisible
        ? visibleLeagues!.data.filter((id) => id !== data)
        : [...visibleLeagues!.data, data]

      await leagueServices.update({ ...baseObject, data: payload })
      return payload
    },
    onMutate: (data) => {
      queryClient.setQueryData(['visible-leagues'], (oldData: any) => {
        return {
          ...oldData,
          data: oldData.data.includes(data)
            ? oldData.data.filter((id: string) => id !== data)
            : [...oldData.data, data],
        }
      })
    },
    onError: () => {
      queryClient.setQueryData(['visible-leagues'], visibleLeagues)
      toast.error('Erro ao atualizar a visibilidade do campeonato')
    },
  })

  return (
    <div className="mx-auto w-full max-w-[800px]">
      {isLoadingLeagues || isLoadingVisibleLeagues ? (
        <>
          <Skeleton className="h-10 w-full" />
          <Skeleton className="mt-4 h-10 w-full" />
          <Skeleton className="mt-4 h-10 w-full" />
          <Skeleton className="mt-4 h-10 w-full" />
          <Skeleton className="mt-4 h-10 w-full" />
        </>
      ) : (
        <>
          {leagues?.map((league) => (
            <div
              key={league.league_id}
              className="flex items-center gap-3 border-b border-dashed border-zinc-400 py-3"
            >
              <Image
                src={league.league_logo}
                width={50}
                height={50}
                quality={100}
                alt={league.league_name}
                className="my-auto h-10 w-10 rounded-full border-2 border-red-500 object-cover"
              />

              <span className="font-bold">{league.league_name}</span>

              <Switch
                onCheckedChange={async () =>
                  await toggleLeagueVisibilityFn(league.league_id)
                }
                checked={visibleLeagues?.data.includes(league.league_id)}
                className="ml-auto"
              />
            </div>
          ))}
        </>
      )}

      <p className="mt-6 text-sm text-zinc-700">
        Os campeonatos selecionados irão constar disponíveis para o usuário
        acompanhar através do aplicativo
      </p>
    </div>
  )
}
