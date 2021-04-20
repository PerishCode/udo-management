import { useState } from 'react'
import { Editor, Form } from '@/components'

export default function Page() {
  const [formData, setFormData] = useState([{ name: '张三' }, { name: '李四' }])
  const [schema, setSchema] = useState({
    type: 'array',
    title: '用户列表',
    template: {
      type: 'object',
      title: '用户信息',
      properties: {
        name: {
          title: '姓名',
          type: 'string',
        },
        sex: {
          title: '性别',
          type: 'string',
        },
      },
    },
  })

  return (
    <div>
      <Editor mode="code" json={schema} onChange={setSchema} hideMenu={true} />
      <Form schema={schema} formData={formData} onChange={setFormData} />
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  )
}
