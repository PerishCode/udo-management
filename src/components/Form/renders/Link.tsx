import { useEffect, useState } from 'react'
import { aggregatedOperation as Do } from '@x-form/react'
import { Select } from 'antd'
import { DocumentRQ, SchemaRQ } from '@/requests'

const { Option } = Select

export default function Link({ schema }) {
  const [documents, setDocuments] = useState([])
  const [linkSchema, setLinkSchema] = useState({})

  const { to } = schema

  useEffect(() => {
    if (to === undefined) return

    SchemaRQ.get(to).then(schema_response =>
      DocumentRQ.getAll('?schema=' + to).then(documents_response => {
        setLinkSchema(schema_response)
        setDocuments(documents_response)
      }),
    )
  }, [])

  return (
    <Select onChange={u => Do(() => (schema.data = u))}>
      {documents.map((document: any) => (
        <Option key={document.id} value={document.id}>
          {document.id}
        </Option>
      ))}
    </Select>
  )
}
