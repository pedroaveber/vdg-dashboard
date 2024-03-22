// Utils
import { format } from 'date-fns'

import type { UserType } from '@/@types/Database'

type CreateFeedMapperProps = Pick<UserType, 'email' | 'id' | 'policy' | 'role'>

export function createUserMapper(data: CreateFeedMapperProps): UserType {
  const user: UserType = {
    active: true,
    avatar: null,
    firstAccess: true,
    timestamp: new Date().getTime(),
    createdAt: format(new Date(), 'dd/MM/yyyy HH:mm:ss'),
    ...data,
  }

  return user
}
