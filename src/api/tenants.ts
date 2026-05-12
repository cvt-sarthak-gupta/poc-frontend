import api from '../lib/axios'

export interface Tenant {
  id: number
  organizationName: string
  subDomain: string
  isActive: boolean
}

export interface TenantsResponse {
  data: Tenant[]
}

export async function fetchTenants(): Promise<TenantsResponse> {
  const res = await api.post<TenantsResponse>('/admin/tenants/all', {})
  return res.data
}
