import { useEffect, useState } from 'react'
import { history } from 'umi'
import { Collapse, Button } from 'antd'
import { Form } from '@/components'
import { SchemaRQ } from '@/requests'

const { Panel } = Collapse
const { Preview } = Form

export default function Page() {
  const [schemas, setSchemas] = useState([])

  useEffect(() => {
    SchemaRQ.getAll().then(setSchemas)
  }, [])

  return (
    <div className="page schema all">
      <Button
        block
        type="primary"
        size="large"
        onClick={() => history.push('/schema/new')}
      >
        新建 Schema
      </Button>
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
