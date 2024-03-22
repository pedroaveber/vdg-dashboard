import type { PurchaseType, UserPurchases, UserType } from '@/@types/Database'

import { Services } from '@/infra/services'
import { FirebaseAuth } from '@/lib/firebase/auth'

class UserService extends Services<UserType> {
  async getUserPurchases(id: string): Promise<UserPurchases | null> {
    const accessToken = await FirebaseAuth.auth.currentUser?.getIdToken()
    try {
      const response = await this.api('/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          collection: 'users_purchases',
          fieldToSearch: 'user_id',
          valueToSearch: id,
        }),
      })

      const res = await response.json()
      if (!res.data) {
        return null
      }
      return res.data[0]
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getAllPurchases(): Promise<PurchaseType[]> {
    const accessToken = await FirebaseAuth.auth.currentUser?.getIdToken()
    const response = await this.api(`/query/all_purchases`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const { data } = await response.json()
    return data
  }
}

export const usersServices = new UserService('users')
