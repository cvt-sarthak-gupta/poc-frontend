import { Typography } from 'antd'
import { useOrders } from '../hooks/useOrders'
import { useTenants } from '../hooks/useTenants'
import OrdersFilters from '../components/orders/OrdersFilters'
import OrdersTable from '../components/orders/OrdersTable'
import ErrorMessage from '../components/ui/ErrorMessage'

const { Title } = Typography

export default function Orders() {
  const { tenantOptions, isLoading: tenantsLoading, isError: tenantsError } = useTenants()
  const {
    page,
    limit,
    order,
    orders,
    pagination,
    isFetching,
    isError: ordersError,
    handleTableChange,
    handleSearch,
    handleTenantFilter,
    handleStatusFilter,
    handleCurrencyFilter,
    handlePageSizeChange,
  } = useOrders()

  return (
    <div className='space-y-4'>
      <Title level={4}>Orders</Title>

      {tenantsError && <ErrorMessage message='Failed to load tenant filters.' />}

      <OrdersFilters
        tenantOptions={tenantOptions}
        tenantsLoading={tenantsLoading}
        onSearch={handleSearch}
        onTenantChange={handleTenantFilter}
        onStatusChange={handleStatusFilter}
        onCurrencyChange={handleCurrencyFilter}
      />

      {ordersError ? (
        <ErrorMessage message='Failed to load orders. Please try again.' />
      ) : (
        <OrdersTable
          orders={orders}
          isFetching={isFetching}
          page={page}
          limit={limit}
          order={order}
          total={pagination?.totalRecords ?? 0}
          onTableChange={handleTableChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  )
}
