import { ChannelType } from '@/@types/Database'

export const useChannels = () => {
  function getPartnersLength(data: ChannelType[]) {
    return data.filter((channel) => channel.type === 'partners').length
  }

  function getPlaylistLength(data: ChannelType[]) {
    return data.filter((channel) => channel.type === 'playlist').length
  }

  function onlyPartners(data: ChannelType) {
    return data.type === 'partners'
  }

  function onlyPlaylist(data: ChannelType) {
    return data.type === 'playlist'
  }

  function setAmountInLocalStorage(data: ChannelType[]) {
    localStorage.setItem(
      '@VDG-CHANNELS:PLAYLIST-COUNT',
      data.filter(onlyPlaylist).length.toString(),
    )

    localStorage.setItem(
      '@VDG-CHANNELS:PARTNERS-COUNT',
      data.filter(onlyPartners).length.toString(),
    )
  }

  function getAmountInLocalStorage() {
    const playlistsLength = localStorage.getItem('@VDG-CHANNELS:PLAYLIST-COUNT')

    const partnersLength = localStorage.getItem('@VDG-CHANNELS:PARTNERS-COUNT')

    return {
      playlistsLength: playlistsLength ? parseInt(playlistsLength) : 8,
      partnersLength: partnersLength ? parseInt(partnersLength) : 8,
    }
  }

  return {
    getPartnersLength,
    getPlaylistLength,
    onlyPartners,
    onlyPlaylist,
    getAmountInLocalStorage,
    setAmountInLocalStorage,
  }
}
