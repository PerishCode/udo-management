import { useEffect, useState } from 'react'
import XForm from '@x-form/react-jsonschema'
import { Form } from '@/components'
import { SchemaRQ, DocumentRQ } from '@/requests'
import { Button, message } from 'antd'

export default function Page({
  match: {
    params: { id },
  },
}) {
  const [document, setDocument] = useState(null)
  const [schema, setSchema] = useState({})

  useEffect(() => {
    DocumentRQ.get(id).then(document_response => {
      SchemaRQ.get(document_response.schema).then(schema_response => {
        setSchema(schema_response.content)
        setDocument(document_response.content)
      })
    })
  }, [])

  function updateHandler() {
    DocumentRQ.update(id, document).then(() => {
      message.success('保存成功', 1)
    })
  }

  return (
    <div className="page document single">
      <Button block type="primary" size="large" onClick={updateHandler}>
        保存
      </Button>
      <XForm
        formData={document}
        onChange={setDocument}
        schema={schema}
        extensions={Form.Default}
      />
    </div>
  )
}
