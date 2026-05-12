import api from '../lib/axios'

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled'

export interface Order {
  id: number
  orderNumber: string
  status: OrderStatus
  totalAmount: string
  currency: string
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
