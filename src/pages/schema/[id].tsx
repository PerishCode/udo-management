import { useEffect, useState } from 'react'
import { Button, message } from 'antd'
import XForm from '@x-form/react-jsonschema'
import { Form, Editor, Viewer } from '@/components'
import { SchemaRQ } from '@/requests'

export default function Page({
  match: {
    params: { id },
  },
}) {
  const [formData, setFormData] = useState(null)
  const [schema, setSchema] = useState({})

  useEffect(() => {
    SchemaRQ.get(id).then(schema_response => setSchema(schema_response.content))
  }, [])

  function saveHandler() {
    SchemaRQ.update(id, schema).then(() => {
      message.success('保存成功', 1)
    })
  }

  return (
    <div className="page schema single">
      <Editor className="editor" json={schema} onChange={setSchema} />
      <XForm
        className="form"
        schema={schema}
        formData={formData}
        onChange={setFormData}
        extensions={Form.Default}
      />
      <Viewer className="preview" json={formData} />
      <Button className="extra" onClick={saveHandler}>
        保存
      </Button>
    </div>
  )
}
