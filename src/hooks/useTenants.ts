import { useQuery } from '@tanstack/react-query'
import { fetchTenants } from '../api/tenants'

export function useTenants() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['tenants'],
    queryFn: fetchTenants,
    staleTime: Infinity,
  })

  const tenantOptions = (data?.data ?? []).map((t) => ({
    label: t.organizationName,
    value: String(t.id),
  }))

  return { tenantOptions, isLoading, isError }
}
