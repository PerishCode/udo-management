import { useEffect, useState } from 'react'
import { history } from 'umi'
import { Collapse, Button } from 'antd'
import XForm from '@x-form/react-jsonschema'
import { Form } from '@/components'
import { SchemaRQ } from '@/requests'

const { Panel } = Collapse

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
          <Panel
            key={schema.id}
            header={schema.id}
            extra={
              <Button onClick={() => history.push('/schema/' + schema.id)}>
                编辑
              </Button>
            }
          >
            <XForm
              schema={schema.content}
              className="preview"
              extensions={Form.Default}
            />
          </Panel>
        ))}
      </Collapse>
    </div>
  )
}
