import { Tag } from 'antd'
import { STATUS_COLOR } from '../../constants/orders'
import type { OrderStatus } from '../../api/orders'

interface OrderStatusTagProps {
  status: OrderStatus
}

export default function OrderStatusTag({ status }: OrderStatusTagProps) {
  return (
    <Tag color={STATUS_COLOR[status]} className='capitalize'>
      {status}
    </Tag>
  )
}
