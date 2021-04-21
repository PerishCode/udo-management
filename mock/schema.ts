let schemas = [
  {
    id: 'author',
    content: {
      type: 'object',
      title: '作者',
      properties: {
        name: {
          type: 'string',
          title: '姓名',
        },
        sex: {
          type: 'string',
          title: '性别',
          enum: ['男', '女'],
        },
      },
    },
  },
]

export default {
  'GET /api/schema': (_, res) => {
    res.send(schemas)
  },

  'GET /api/schema/:id': ({ params: { id } }, res) => {
    res.send(schemas.find(schema => schema.id === id))
  },

  'POST /api/schema/:id': ({ params: { id }, body }, res) => {
    const schema = {
      id,
      content: body,
    }
    schemas.push(schema)
    res.send(schema)
  },

  'PUT /api/schema/:id': ({ params: { id }, body }, res) => {
    const schema = {
      id,
      content: body,
    }
    schemas = schemas.map(s => (s.id === id ? schema : s))
    res.send(schema)
  },

  'DELETE /api/schema/:id': ({ params: { id } }, res) => {
    schemas = schemas.filter(s => s.id !== id)
    res.send(id)
  },
}
