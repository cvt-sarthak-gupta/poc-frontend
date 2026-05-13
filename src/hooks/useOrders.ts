import { useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { TablePaginationConfig } from 'antd'
import type {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from 'antd/es/table/interface'
import {
  fetchOrders,
  type Order,
  type OrderStatus,
  type OrderCurrency,
} from '../api/orders'

export function useOrders() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')
  const [search, setSearch] = useState('')
  const [tenantIds, setTenantIds] = useState<number[]>([])
  const [statuses, setStatuses] = useState<OrderStatus[]>([])
  const [currencies, setCurrencies] = useState<OrderCurrency[]>([])

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: [
      'orders',
      page,
      limit,
      order,
      search,
      tenantIds,
      statuses,
      currencies,
    ],
    queryFn: () =>
      fetchOrders({
        page,
        limit,
        order,
        search: search || undefined,
        tenantIds,
        status: statuses.length ? statuses : undefined,
        currency: currencies.length ? currencies : undefined,
      }),
    gcTime: 0,
  })

  function handleTableChange(
    paginationConfig: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Order> | SorterResult<Order>[],
    extra: TableCurrentDataSource<Order>,
  ) {
    if (extra.action === 'sort') {
      const s = Array.isArray(sorter) ? sorter[0] : sorter
      // s.order is undefined when the cycle wraps — toggle manually
      const newOrder: 'asc' | 'desc' =
        s.order === 'ascend'
          ? 'asc'
          : s.order === 'descend'
            ? 'desc'
            : order === 'asc'
              ? 'desc'
              : 'asc'
      setOrder(newOrder)
      setPage(1)
    } else if (extra.action === 'paginate') {
      // Skip if page size changed — handlePageSizeChange already owns that transition
      if ((paginationConfig.pageSize ?? limit) !== limit) return
      setPage(paginationConfig.current ?? 1)
    }
  }

  const handleSearch = useCallback((val: string) => {
    setSearch(val)
    setPage(1)
  }, [])

  const handleTenantFilter = useCallback((val: string[]) => {
    setTenantIds(val.map(Number))
    setPage(1)
  }, [])

  const handleStatusFilter = useCallback((val: OrderStatus[]) => {
    setStatuses(val)
    setPage(1)
  }, [])

  const handleCurrencyFilter = useCallback((val: OrderCurrency[]) => {
    setCurrencies(val)
    setPage(1)
  }, [])

  function handlePageSizeChange(_current: number, size: number) {
    setLimit(size)
    setPage(1)
  }

  return {
    page,
    limit,
    order,
    orders: data?.data ?? [],
    pagination: data?.pagination,
    isLoading,
    isFetching,
    isError,
    error,
    handleTableChange,
    handleSearch,
    handleTenantFilter,
    handleStatusFilter,
    handleCurrencyFilter,
    handlePageSizeChange,
  }
}
