import { useEffect, useState } from 'react'
import { Collapse } from 'antd'
import { DocumentRQ, SchemaRQ } from '@/requests'
import { Form } from '@/components'

const { Panel } = Collapse
const { ReadOnly } = Form

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
      <Collapse>
        {documents.map((document: any) => (
          <Panel key={document.id} header={document.id}>
            <ReadOnly
              className="readonly"
              schema={schema.content}
              formData={document.content}
            />
          </Panel>
        ))}
      </Collapse>
    </div>
  )
}
