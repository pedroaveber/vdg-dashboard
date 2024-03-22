import type { UserType } from './Database'

export interface UserLoggedType extends UserType {
  expiresIn: Date
}
