import { Card as Antd_Card } from 'antd'

export default function Card({ schema: { title }, children }) {
  return (
    <Antd_Card title={title} size="small">
      {children}
    </Antd_Card>
  )
}
