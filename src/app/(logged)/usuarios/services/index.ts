import type { UserType } from '@/@types/Database'
import { CreateAdminUserResponseDTO } from '../dtos/create-admin-user-response-dto'

import { Services } from '@/infra/services'
import { FirebaseAuth } from '@/lib/firebase/auth'

class UserService extends Services<UserType> {
  public async createAdminUser({
    email,
  }: {
    email: string
  }): Promise<CreateAdminUserResponseDTO> {
    const accessToken = await FirebaseAuth.auth.currentUser?.getIdToken()
    const response = await this.api('/create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        email,
      }),
    })

    const { data } = await response.json()
    return data
  }

  public async getUserByEmail({
    email,
  }: {
    email: string
  }): Promise<UserType | null> {
    const accessToken = await FirebaseAuth.auth.currentUser?.getIdToken()
    const response = await this.api('/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        collection: 'users',
        fieldToSearch: 'email',
        valueToSearch: email,
      }),
    })

    const { data } = await response.json()

    if (data) {
      return data[0]
    }

    return null
  }

  public async updateUserRole({ user }: { user: UserType }) {
    const accessToken = await FirebaseAuth.auth.currentUser?.getIdToken()
    await this.api('/query/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        collection: 'users',
        data: user,
      }),
    })
  }
}

export const usersServices = new UserService('users')
