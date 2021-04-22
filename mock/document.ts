let documents = [
  {
    id: '00000001',
    schema: 'Author',
    content: {
      name: '张三',
      sex: '男',
    },
  },
] as any

export default {
  'GET /api/document': ({ query: { schema } }, res) => {
    res.send(
      schema === undefined
        ? documents
        : documents.filter(document => document.schema === schema),
    )
  },

  'GET /api/document/:id': ({ params: { id } }, res) => {
    res.send(documents.find(document => document.id === id))
  },

  'POST /api/document': ({ body, query: { schema } }, res) => {
    const document = {
      id: String(Math.floor(Math.random() * 1000000000)).padStart(8, '0'),
      schema,
      content: body,
    }
    documents.push(document)
    res.send(document)
  },

  'PUT /api/document/:id': ({ params: { id }, body }, res) => {
    const document = documents.find(document => document.id === id)
    document.content = body

    res.send(document)
  },

  'DELETE /api/document/:id': ({ params: { id } }, res) => {
    documents = documents.filter(s => s.id !== id)
    res.send(id)
  },
}
