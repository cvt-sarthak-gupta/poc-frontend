import { useMemo } from 'react'
import { Table } from 'antd'
import type { TableProps, TablePaginationConfig } from 'antd'
import type { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface'
import type { Order, OrderStatus } from '../../api/orders'
import { PAGE_SIZE_OPTIONS } from '../../constants/orders'
import OrderStatusTag from './OrderStatusTag'

interface OrdersTableProps {
  orders: Order[]
  isFetching: boolean
  page: number
  limit: number
  order: 'asc' | 'desc'
  total: number
  onTableChange: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Order> | SorterResult<Order>[],
    extra: TableCurrentDataSource<Order>,
  ) => void
  onPageSizeChange: (current: number, size: number) => void
}

function buildColumns(order: 'asc' | 'desc', page: number, limit: number): TableProps<Order>['columns'] {
  return [
    {
      title: '#',
      key: 'serial',
      width: 60,
      render: (_: unknown, __: Order, index: number) => (page - 1) * limit + index + 1,
    },
    {
      title: 'Order Number',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      width: 220,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: OrderStatus) => <OrderStatusTag status={status} />,
    },
    {
      title: 'Amount',
      key: 'amount',
      width: 140,
      render: (_: unknown, record: Order) => (
        <span className='font-medium tabular-nums'>
          {parseFloat(record.totalAmount).toLocaleString('en-US', {
            style: 'currency',
            currency: record.currency,
            minimumFractionDigits: 2,
          })}
        </span>
      ),
    },
    {
      title: 'Tenant',
      key: 'tenant',
      width: 200,
      render: (_: unknown, record: Order) => (
        <div>
          <div className='font-medium'>{record.tenantName}</div>
          <div className='text-xs text-gray-400'>{record.tenantSubDomain}</div>
        </div>
      ),
    },
    {
      title: 'Tenant ID',
      dataIndex: 'tenantId',
      key: 'tenantId',
      width: 100,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: true,
      sortOrder: order === 'asc' ? 'ascend' : 'descend',
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: { title: 'Sort by created date' },
      width: 180,
      render: (val: string) =>
        new Date(val).toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
    },
  ]
}

export default function OrdersTable({
  orders,
  isFetching,
  page,
  limit,
  order,
  total,
  onTableChange,
  onPageSizeChange,
}: OrdersTableProps) {
  const columns = useMemo(() => buildColumns(order, page, limit), [order, page, limit])

  return (
    <Table<Order>
      rowKey='id'
      columns={columns}
      dataSource={orders}
      loading={isFetching}
      onChange={onTableChange}
      scroll={{ x: 'max-content' }}
      pagination={{
        current: page,
        pageSize: limit,
        total,
        showSizeChanger: true,
        pageSizeOptions: PAGE_SIZE_OPTIONS,
        onShowSizeChange: onPageSizeChange,
        showTotal: (t) => `${t} orders`,
      }}
    />
  )
}
