import { Col, Row } from 'antd'

export default function Label({ schema: { title }, children }) {
  return (
    <Row align="middle">
      <Col span={4}>{title}</Col>
      <Col span={20}>{children}</Col>
    </Row>
  )
}
