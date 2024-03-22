'use client'

// Hooks
import { useQuery } from '@tanstack/react-query'
import { useChannels } from './hooks/use-channel'

// Components
import { ChannelItem } from './components/channel-item'
import { NewItemAnchor } from '@/components/NewItemAnchor'
import { ChannelsPageSkeleton } from './components/channels-page-skeleton'

// Services
import { channelServices } from './services'

export default function Channels() {
  const {
    getPartnersLength,
    getPlaylistLength,
    onlyPartners,
    onlyPlaylist,
    setAmountInLocalStorage,
  } = useChannels()

  const { data, error, isLoading } = useQuery({
    queryKey: ['channels-general'],
    queryFn: async () => {
      const response = await channelServices.index()
      setAmountInLocalStorage(response)
      return response
    },
  })

  if (error) {
    throw new Error('Erro ao buscar canais, tente novamente mais tarde')
  }

  if (!data || isLoading) return <ChannelsPageSkeleton />

  const partnersLength = getPartnersLength(data)
  const playlistLength = getPlaylistLength(data)

  return (
    <div className="my-8 flex w-full max-w-[1200px] flex-col px-4 pb-16">
      {playlistLength > 0 && (
        <>
          <span className="text-lg font-bold text-zinc-700 dark:text-zinc-50">
            Playlists
          </span>

          <div className="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            {data.filter(onlyPlaylist).map((channel) => {
              return <ChannelItem key={channel.id} {...channel} />
            })}
          </div>

          <hr className="my-8" />
        </>
      )}

      {partnersLength > 0 && (
        <>
          <span className="text-lg font-bold text-zinc-700 dark:text-zinc-50">
            Canais parceiros
          </span>

          <div className="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            {data.filter(onlyPartners).map((channel) => {
              return <ChannelItem key={channel.id} {...channel} />
            })}
          </div>
        </>
      )}

      {partnersLength === 0 && playlistLength === 0 && (
        <span className="text-lg font-bold text-zinc-700 dark:text-zinc-50">
          Nenhum canal cadastrado
        </span>
      )}

      <div className="flex w-full items-center justify-end">
        {playlistLength <= 16 && <NewItemAnchor customHref="/channels/novo" />}
      </div>
    </div>
  )
}
