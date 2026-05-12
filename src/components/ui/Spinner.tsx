import { Spin } from 'antd'

interface SpinnerProps {
  size?: 'small' | 'default' | 'large'
  fullPage?: boolean
}

export default function Spinner({ size = 'large', fullPage = false }: SpinnerProps) {
  if (fullPage) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <Spin size={size} />
      </div>
    )
  }
  return <Spin size={size} />
}
