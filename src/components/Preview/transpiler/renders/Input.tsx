import { Input as Antd_Input } from 'antd'
import { aggregatedOperation as Do } from '@x-form/react'

export default function Input({ schema }) {
  return (
    <Antd_Input
      value={schema.data || ''}
      onChange={(e: any) =>
        Do(() => {
          schema.data = e.target.value
        })
      }
    />
  )
}
