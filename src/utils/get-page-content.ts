import { NewsService } from '@/lib/firebase/database/news-service'
import { EventsService } from '@/lib/firebase/database/events-service'
import { BannerService } from '@/lib/firebase/database/banners-service'
import { CovenantsService } from '@/lib/firebase/database/covenants-service'

import type {
  BannerType,
  CovenantType,
  EventType,
  FeedType,
  NewsType,
  SurveyType,
} from '@/@types/Database'
import { FeedService } from '@/lib/firebase/database/feed-service'
import { RoutesType } from '@/@types/Routes'
import { SurveyService } from '@/lib/firebase/database/surveys-service'

interface GetPageContentProps {
  type: RoutesType
  page?: string
}

export async function getPageContent({
  type,
  page = '1',
}: GetPageContentProps) {
  if (type === 'banner') {
    const { documents, quantity } =
      await BannerService.getAllDocuments<BannerType>(Number(page))

    console.log(documents)
    return treatObjectToReturn({ data: documents, quantity })
  }

  if (type === 'convenio') {
    const { documents, quantity } =
      await CovenantsService.getAllDocuments<CovenantType>(Number(page))
    return treatObjectToReturn({ data: documents, quantity })
  }

  if (type === 'evento') {
    const { documents, quantity } =
      await EventsService.getAllDocuments<EventType>(Number(page))
    return treatObjectToReturn({ data: documents, quantity })
  }

  if (type === 'feed') {
    const { documents, quantity } = await FeedService.getAllDocuments<FeedType>(
      Number(page),
    )
    return treatObjectToReturn({ data: documents, quantity })
  }

  if (type === 'enquete') {
    const { documents, quantity } =
      await SurveyService.getAllDocuments<SurveyType>(Number(page))
    return treatObjectToReturn({ data: documents, quantity })
  }

  const { documents, quantity } = await NewsService.getAllDocuments<NewsType>(
    Number(page),
  )
  return treatObjectToReturn({ data: documents, quantity })
}

interface TreatObjectToReturnProps {
  data: Array<
    BannerType | CovenantType | EventType | NewsType | FeedType | SurveyType
  >
  quantity: number
}

function treatObjectToReturn({ data, quantity }: TreatObjectToReturnProps) {
  const documents = data.map((item) => ({
    ...item,
  }))

  return {
    documents,
    quantity,
  }
}
