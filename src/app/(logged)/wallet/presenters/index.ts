import { PurchaseType, UserType } from '@/@types/Database'
import { CurrencyFormatter } from '@/utils/currency-formatter'
import { format } from 'date-fns'

export type DisplayUser = {
  id: string
  name: string
  email: string
  avatarUrl: string | null
}

export type DisplayUserPurchase = {
  type: string
  price: string
  createdAt: string
}

export type DisplayPurchase = {
  type: string
  price: string
  email: string
  createdAt: string
  avatar?: string
  username?: string
}

export class WalletPresenters {
  public static fromUser(data: UserType): DisplayUser {
    const user: DisplayUser = {
      name: data.name ?? 'Anônimo',
      avatarUrl: data.avatar ?? null,
      email: data.email,
      id: data.id,
    }

    return user
  }

  public static fromUserPurchases(data: PurchaseType): DisplayUserPurchase {
    const purchase: DisplayUserPurchase = {
      createdAt: format(new Date(data.date), 'dd/MM/yyyy'),
      price: `R$ ${CurrencyFormatter.formatAsCurrencyFromNumber(data.price)}`,
      type: data.type,
    }

    return purchase
  }

  public static fromAllUserPurchases(data: PurchaseType): DisplayPurchase {
    const purchase: DisplayPurchase = {
      createdAt: format(new Date(data.date), 'dd/MM/yyyy'),
      price: `R$ ${CurrencyFormatter.formatAsCurrencyFromNumber(data.price)}`,
      type: data.type,
      email: data.user.email,
      avatar: data.user.avatar,
      username: data.user.username,
    }

    return purchase
  }
}
