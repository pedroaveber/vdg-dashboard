import { NewsService } from '@/lib/firebase/database/news-service'
import { EventsService } from '@/lib/firebase/database/events-service'
import { BannerService } from '@/lib/firebase/database/banners-service'
import { CovenantsService } from '@/lib/firebase/database/covenants-service'

import { RoutesType } from '@/@types/Routes'
import { FeedService } from '@/lib/firebase/database/feed-service'
import { SurveyService } from '@/lib/firebase/database/surveys-service'
import { ChannelsService } from '@/lib/firebase/database/channels-service'

interface DeleteItemProps {
  action: RoutesType
  id: string
}

export async function deleteItem({ action, id }: DeleteItemProps) {
  if (action === 'banner') {
    try {
      await BannerService.deleteDocumentByPrimaryKey(id)
      window.location.reload()
      return
    } catch (error) {
      throw new Error('Erro ao excluir o item!')
    }
  }

  if (action === 'evento') {
    try {
      await EventsService.deleteDocumentByPrimaryKey(id)
      window.location.reload()
      return
    } catch (error) {
      throw new Error('Erro ao excluir o item!')
    }
  }

  if (action === 'convenio') {
    try {
      await CovenantsService.deleteDocumentByPrimaryKey(id)
      window.location.reload()
      return
    } catch (error) {
      throw new Error('Erro ao excluir o item!')
    }
  }

  if (action === 'feed') {
    try {
      await FeedService.deleteDocumentByPrimaryKey(id)
      window.location.reload()
      return
    } catch (error) {
      throw new Error('Erro ao excluir o item!')
    }
  }

  if (action === 'enquete') {
    try {
      await SurveyService.deleteDocumentByPrimaryKey(id)
      window.location.reload()
      return
    } catch (error) {
      throw new Error('Erro ao excluir o item!')
    }
  }

  if (action === 'channels') {
    try {
      await ChannelsService.deleteDocumentByPrimaryKey(id)
      window.location.reload()
      return
    } catch (error) {
      throw new Error('Erro ao excluir o item!')
    }
  }

  try {
    window.location.reload()
    await NewsService.deleteDocumentByPrimaryKey(id)
  } catch (error) {
    throw new Error('Erro ao excluir o item!')
  }
}
