import { Input, Select, Space } from 'antd'
import { useState, useEffect, useRef, memo } from 'react'
import { OrderStatus, OrderCurrency } from '../../api/orders'

interface TenantOption {
  label: string
  value: string
}

interface OrdersFiltersProps {
  tenantOptions: TenantOption[]
  tenantsLoading: boolean
  onSearch: (val: string) => void
  onTenantChange: (val: string[]) => void
  onStatusChange: (val: OrderStatus[]) => void
  onCurrencyChange: (val: OrderCurrency[]) => void
}

const CURRENCY_OPTIONS = [
  { label: 'USD', value: OrderCurrency.USD },
  { label: 'EUR', value: OrderCurrency.EUR },
  { label: 'GBP', value: OrderCurrency.GBP },
]

const STATUS_OPTIONS = [
  { label: 'Pending', value: OrderStatus.PENDING },
  { label: 'Processing', value: OrderStatus.PROCESSING },
  { label: 'Completed', value: OrderStatus.COMPLETED },
  { label: 'Cancelled', value: OrderStatus.CANCELLED },
]

function OrdersFilters({
  tenantOptions,
  tenantsLoading,
  onSearch,
  onTenantChange,
  onStatusChange,
  onCurrencyChange,
}: OrdersFiltersProps) {
  const [searchValue, setSearchValue] = useState('')
  const onSearchRef = useRef(onSearch)
  onSearchRef.current = onSearch

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchRef.current(searchValue)
    }, 400)
    return () => clearTimeout(timer)
  }, [searchValue])

  return (
    <Space
      wrap
      size='middle'
    >
      <Input.Search
        placeholder='Search by order number'
        allowClear
        style={{ width: 240 }}
        value={searchValue}
        onChange={(e) => {
          const val = e.target.value
          setSearchValue(val)
          if (!val) onSearchRef.current('')
        }}
        onSearch={(val, _, info) => {
          if (info?.source === 'clear') return
          setSearchValue(val)
          onSearchRef.current(val)
        }}
      />
      <Select
        mode='multiple'
        allowClear
        placeholder='Filter by status'
        style={{ minWidth: 200 }}
        options={STATUS_OPTIONS}
        onChange={onStatusChange}
      />
      <Select
        mode='multiple'
        allowClear
        placeholder='Filter by currency'
        style={{ minWidth: 180 }}
        options={CURRENCY_OPTIONS}
        onChange={onCurrencyChange}
      />
      <Select
        mode='multiple'
        allowClear
        loading={tenantsLoading}
        placeholder='Filter by tenant'
        style={{ minWidth: 240 }}
        options={tenantOptions}
        onChange={onTenantChange}
      />
    </Space>
  )
}

export default memo(OrdersFilters)
