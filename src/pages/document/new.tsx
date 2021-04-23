import { useEffect, useState } from 'react'
import { history } from 'umi'
import { Button, message } from 'antd'
import XForm from '@x-form/react-jsonschema'
import { DocumentRQ, SchemaRQ } from '@/requests'
import { Form } from '@/components'

export default function Page({
  location: {
    search,
    query: { schema: schemaId },
  },
}) {
  const [document, setDocument] = useState(null as any)
  const [schema, setSchema] = useState({} as any)

  useEffect(() => {
    if (schemaId === undefined) return

    SchemaRQ.get(schemaId).then(({ content }) => {
      setSchema(content)
    })
  }, [])

  function createHandler() {
    DocumentRQ.create(search, document).then(({ id }) => {
      message.success('创建成功,即将跳转', 0.5, () =>
        history.push('/document/' + id),
      )
      // history.push('/document/' + id)
    })
  }

  return (
    <div className="page document new">
      <Button block type="primary" size="large" onClick={createHandler}>
        创建
      </Button>
      <XForm
        schema={schema}
        formData={document}
        onChange={setDocument}
        extensions={Form.Default}
      />
    </div>
  )
}
