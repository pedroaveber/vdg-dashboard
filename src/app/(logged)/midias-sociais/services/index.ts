import { SocialMediaType } from '@/@types/Database'
import { Services } from '@/infra/services'

export const socialMediaService = new Services<SocialMediaType>('social-media')
