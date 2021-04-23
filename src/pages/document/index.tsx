import { useEffect, useState } from 'react'
import { history } from 'umi'
import { Button, Collapse } from 'antd'
import XForm from '@x-form/react-jsonschema'
import { DocumentRQ, SchemaRQ } from '@/requests'
import { Form } from '@/components'

const { Panel } = Collapse

export default function Page({
  location: {
    search,
    query: { schema: schemaId },
  },
}) {
  const [documents, setDocuments] = useState([] as any)
  const [schema, setSchema] = useState(null as any)

  useEffect(() => {
    if (schemaId === undefined) return

    DocumentRQ.getAll(search).then(documents_response =>
      SchemaRQ.get(schemaId).then(schema_response => {
        setSchema(schema_response)
        setDocuments(documents_response)
      }),
    )
  }, [])

  return (
    <div className="page document all">
      <Button
        block
        type="primary"
        size="large"
        onClick={() => history.push('/document/new' + search)}
      >
        新建
      </Button>
      <Collapse>
        {documents.map(({ id, content }: any) => (
          <Panel
            key={id}
            header={id}
            extra={
              <Button onClick={() => history.push('/document/' + id)}>
                编辑
              </Button>
            }
          >
            <XForm
              className="readonly"
              schema={schema.content}
              formData={content}
              extensions={Form.ReadOnly}
            />
          </Panel>
        ))}
      </Collapse>
    </div>
  )
}
