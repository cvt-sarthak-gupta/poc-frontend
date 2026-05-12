import { Alert } from 'antd'

interface ErrorMessageProps {
  message?: string
}

export default function ErrorMessage({
  message = 'An unexpected error occurred. Please try again.',
}: ErrorMessageProps) {
  return <Alert type='error' showIcon message={message} />
}
