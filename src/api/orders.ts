import api from '../lib/axios'

export const OrderCurrency = {
  USD: 'USD',
  EUR: 'EUR',
  GBP: 'GBP',
} as const

export type OrderCurrency = (typeof OrderCurrency)[keyof typeof OrderCurrency]

export const OrderStatus = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]

export interface Order {
  id: number
  orderNumber: string
  status: OrderStatus
  totalAmount: string
  currency: OrderCurrency
  tenantId: number
  tenantName: string
  tenantSubDomain: string
  createdAt: string
  updatedAt: string
  metadata: { seeded: boolean; tenantId: number }
}

export interface OrdersParams {
  page: number
  limit: number
  tenantIds: number[]
  order: 'asc' | 'desc'
  search?: string
  status?: OrderStatus[]
  currency?: OrderCurrency[]
}

export interface OrdersResponse {
  status: string
  pagination: {
    page: number
    limit: number
    totalRecords: number
    totalPages: number
    nextPage: boolean
    prevPage: boolean
  }
  data: Order[]
}

export async function fetchOrders(
  params: OrdersParams,
): Promise<OrdersResponse> {
  const res = await api.post<OrdersResponse>('/orders/admin/all', params)
  return res.data
}
