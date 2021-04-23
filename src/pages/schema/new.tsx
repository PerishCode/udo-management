import { useState } from 'react'
import { history } from 'umi'
import { Input, Button, Row, Col, message } from 'antd'
import XForm from '@x-form/react-jsonschema'
import { Form, Editor, Viewer } from '@/components'
import { SchemaRQ } from '@/requests'

export default function Page() {
  const [formData, setFormData] = useState(null)
  const [schema, setSchema] = useState({
    type: 'string',
    title: '数据',
  })
  const [id, setId] = useState('')

  function createHandler() {
    SchemaRQ.create(id, schema).then(() => {
      message.success('创建成功 正在跳转', 1)
      history.push('/schema/' + id)
    })
  }

  return (
    <div className="page schema new">
      <Editor className="editor" json={schema} onChange={setSchema} />
      <XForm
        className="form"
        schema={schema}
        formData={formData}
        onChange={setFormData}
        extensions={Form.Default}
      />
      <Viewer className="preview" json={formData} />
      <Row className="extra">
        <Col span={20}>
          <Input value={id} onChange={e => setId(e.target.value)} />
        </Col>
        <Col span={4}>
          <Button block onClick={createHandler}>
            创建
          </Button>
        </Col>
      </Row>
    </div>
  )
}
