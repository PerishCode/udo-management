import { useEffect, useState } from 'react'
import XForm from '@x-form/react-jsonschema'
import { Form } from '@/components'
import { SchemaRQ, DocumentRQ } from '@/requests'
import { Button, message } from 'antd'

export default function Page({
  match: {
    params: { id },
  },
  location: {
    query: { schema: schemaId },
  },
}) {
  const [document, setDocument] = useState(null)
  const [schema, setSchema] = useState({})

  useEffect(() => {
    SchemaRQ.get(schemaId).then(schema_response =>
      DocumentRQ.get(id, schemaId, schema_response.content).then(
        document_response => {
          setSchema(schema_response.content)
          setDocument(document_response.content)
        },
      ),
    )
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
