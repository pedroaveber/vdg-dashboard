export interface DatabaseCoreType {
  id: string
  active: boolean
  createdAt: string
  timestamp: number
}

type PrivacyType =
  | 'PUBLIC'
  | 'REGISTEREDS'
  | 'MEMBERS_ONLY'
  | 'VIP_MEMBERS_ONLY'

export interface UserType extends DatabaseCoreType {
  email: string
  firstAccess: boolean
  role: 'admin' | 'user' | 'super-admin'
  policy: string[]
  name?: string | null
  username?: string | null
  avatar?: string | null
  youtubeEmail?: string | null
  hasFailed?: boolean | null
}

export interface BannerType extends DatabaseCoreType {
  title: string
  imagePath: string
  highlighted: boolean
  link?: string | null
}

export interface LeagueType extends DatabaseCoreType {
  data: string[]
}

export interface NewsType extends DatabaseCoreType {
  title: string
  imagePath: string
  description: string
  date: string
  author: {
    id: string
    name: string | null
    avatar: string | null
  } | null
  privacy: PrivacyType
  link?: string | null
}
export interface FeedType extends DatabaseCoreType {
  description: string
  author: {
    id: string
    name: string | null
    avatar: string | null
  } | null
  privacy: PrivacyType
  publishOnWhatsapp: boolean
  published: boolean
  link?: string | null
  imagePath?: string | null
  secondaryImagePath?: string | null
}

export interface CovenantType extends DatabaseCoreType {
  title: string
  logoPath: string
  imagePath: string
  description: string
  privacy: PrivacyType
  slogan?: string | null
  link?: string | null
  qrCode?: string | null
  externalCode?: string | null
}

export interface EventType extends DatabaseCoreType {
  title: string
  date: string
  hour: string
  validity: string
  imagePath: string
  description: string
  privacy: PrivacyType
  paymentManagement: boolean
  backgroundImagePath: string
  subtitle?: string | null
  alertMessage?: string | null
  price?: number | null
  city?: string | null
  link?: string | null
  state?: string | null
  local?: string | null
  number?: string | null
  zipcode?: string | null
  address?: string | null
  complement?: string | null
  neighborhood?: string | null
}

export interface ChannelType extends DatabaseCoreType {
  name: string
  link: string
  imagePath: string
  type: 'playlist' | 'partners'
}

export interface SurveyType extends DatabaseCoreType {
  question: string
  validityDate: string
  validityHour: string
  privacy: PrivacyType
  options: Array<{
    value: string
    votes: number
  }>
  associateFootball: boolean
  associatedMatchId?: string | null
}

export interface CommentType {
  id: string
  comment: string
  isPaid: boolean
  user: UserType
  timestamp: number
}

export interface LiveCommentType extends CommentType {
  hasBeenHighlighted: boolean
}

export type OrderType = {
  collector_id: number
  date: string | null
  fee_details: any[]
  id: number
  installments: number
  payer: null
  payment_method_id: string
  status: string
  status_detail: string
  transaction_amount: number
  transaction_details: {
    installment_amount: number
    net_received_amout: number
    total_paid_amount: number
  }
}

export type PurchaseType = {
  date: string
  event_image?: string
  lint?: string
  price: number
  privacy?: string
  title?: string
  type: string
  user: {
    createdAt?: string
    email: string
    id: string
    username?: string
    avatar?: string
    role?: string
    cellphone?: string
    youtubeEmail?: string
  }
  user_id: string
}

export type UserPurchases = {
  user_id: string
  historic: PurchaseType[]
}
