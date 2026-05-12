import { Input, Select, Space } from 'antd'
import { useState, useEffect, useRef, memo } from 'react'

interface TenantOption {
  label: string
  value: string
}

interface OrdersFiltersProps {
  tenantOptions: TenantOption[]
  tenantsLoading: boolean
  onSearch: (val: string) => void
  onTenantChange: (val: string[]) => void
}

function OrdersFilters({
  tenantOptions,
  tenantsLoading,
  onSearch,
  onTenantChange,
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
        placeholder='Search by name'
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
