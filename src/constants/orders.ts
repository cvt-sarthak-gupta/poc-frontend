import type { OrderStatus } from '../api/orders'

export const STATUS_COLOR: Record<OrderStatus, string> = {
  pending: 'orange',
  processing: 'blue',
  completed: 'green',
  cancelled: 'red',
}

export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100]
