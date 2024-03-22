import { UserType } from '@/@types/Database'
import { Services } from '@/infra/services'

class ProfileService extends Services<UserType> {}

export const profileService = new ProfileService('users')
