import type { OrderType } from '@/@types/Database'

export class OrderPresenter {
  public static toHTTP(order: OrderType) {
    return {
      id: order.id,
      status: order.status,
      statusDetail: order.status_detail,
      amount: order.transaction_amount,
    }
  }
}
