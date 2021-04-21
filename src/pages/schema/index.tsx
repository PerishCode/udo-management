import { useEffect, useState } from 'react'
import { Collapse } from 'antd'
import { Preview } from '@/components'
import { SchemaRQ } from '@/requests'

const { Panel } = Collapse

export default function Page() {
  const [schemas, setSchemas] = useState([])

  useEffect(() => {
    SchemaRQ.getAll().then(setSchemas)
  }, [])

  return (
    <div className="page schema all">
      <Collapse>
        {schemas.map((schema: any) => (
          <Panel key={schema.id} header={schema.id}>
            <Preview schema={schema.content} className="preview" />
          </Panel>
        ))}
      </Collapse>
    </div>
  )
}
