import { useState } from 'react'
import { Form, Editor, Viewer } from '@/components'

const { Default } = Form

export default function App() {
  const [formData, setFormData] = useState([])
  const [schema, setSchema] = useState({
    type: 'array',
    title: '用户列表',
    template: {
      type: 'object',
      title: '用户信息',
      properties: {
        name: {
          title: '教材名称',
          type: 'string',
        },
        authors: {
          title: '作者',
          type: 'array',
          template: {
            type: 'object',
            properties: {
              name: {
                title: '姓名',
                type: 'link',
                to: 'author',
                use: 'name',
              },
              sign: {
                title: '署名',
                type: 'string',
                enum: ['主编', '副主编'],
              },
            },
          },
        },
        publish: {
          type: 'object',
          title: '出版情况',
          properties: {
            time: {
              type: 'date',
              title: '出版时间',
            },
            press: {
              type: 'string',
              title: '出版社',
            },
          },
        },
      },
    },
  })

  return (
    <div className="page schema new">
      <Editor className="editor" json={schema} onChange={setSchema} />
      <Default
        className="form"
        schema={schema}
        formData={formData}
        onChange={setFormData}
      />
      <Viewer className="preview" json={formData} />
    </div>
  )
}
