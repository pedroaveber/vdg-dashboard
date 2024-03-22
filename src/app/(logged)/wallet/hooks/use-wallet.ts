import { PurchaseType, UserType } from '@/@types/Database'
import { DisplayPurchase } from '../presenters'

export const useWallet = () => {
  function withoutAnonymous(user: UserType): boolean {
    return !!user.name
  }

  function orderTransactionsByDay(a: DisplayPurchase, b: DisplayPurchase) {
    const dateA = new Date(a.createdAt)
    const dateB = new Date(b.createdAt)

    if (dateA.getTime() > dateB.getTime()) {
      return -1
    }

    if (dateA.getTime() < dateB.getTime()) {
      return 1
    }

    return 0
  }

  function filterTransactions(
    transaction: DisplayPurchase,
    daysAmount?: number,
  ): boolean {
    const [date, month, year] = transaction.createdAt.split('/')
    const transactionDate = new Date(`${year}-${month}-${date}`)

    const today = new Date()

    const days =
      Math.abs(today.getTime() - transactionDate.getTime()) / 86400000

    if (!daysAmount) return true

    return days <= daysAmount
  }

  return {
    withoutAnonymous,
    filterTransactions,
    orderTransactionsByDay,
  }
}
