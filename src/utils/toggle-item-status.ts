import { FeedService } from '@/lib/firebase/database/feed-service'
import { NewsService } from '@/lib/firebase/database/news-service'
import { EventsService } from '@/lib/firebase/database/events-service'
import { BannerService } from '@/lib/firebase/database/banners-service'
import { SurveyService } from '@/lib/firebase/database/surveys-service'
import { CovenantsService } from '@/lib/firebase/database/covenants-service'

import { RoutesType } from '@/@types/Routes'

interface ToggleItemStatusProps {
  id: string
  type: RoutesType
  active: boolean
}

export async function toggleItemsStatus({
  id,
  type,
  active,
}: ToggleItemStatusProps) {
  if (type === 'banner') {
    await BannerService.changeDocumentStatusByPrimaryKey(id, !active)
    return
  }

  if (type === 'convenio') {
    await CovenantsService.changeDocumentStatusByPrimaryKey(id, !active)
    return
  }

  if (type === 'evento') {
    await EventsService.changeDocumentStatusByPrimaryKey(id, !active)
    window.location.reload()
    return
  }

  if (type === 'feed') {
    await FeedService.changeDocumentStatusByPrimaryKey(id, !active)
    return
  }

  if (type === 'enquete') {
    await SurveyService.changeDocumentStatusByPrimaryKey(id, !active)
    return
  }

  await NewsService.changeDocumentStatusByPrimaryKey(id, !active)
}
