import { useEffect, useState } from 'react'
import { Preview } from '@/components'
import { schema as SchemaRQ } from '@/requests'

export default function Page() {
  const [schemas, setSchemas] = useState([])

  useEffect(() => {
    SchemaRQ.getAll().then(setSchemas)
  }, [])

  return (
    <div className="page schema all">
      {schemas.map((schema: any) => (
        <Preview schema={schema.content} key={schema.id} className="preview" />
      ))}
    </div>
  )
}
