let schemas = [
  {
    id: 'Author',
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
  {
    id: 'Paper',
    content: {
      type: 'object',
      title: '论文',
      properties: {
        title: {
          type: 'string',
          title: '标题',
        },
        authors: {
          type: 'array',
          display: 'list',
          title: '相关作者',
          template: {
            type: 'object',
            properties: {
              name: {
                type: 'link',
                to: 'Author',
                title: '作者',
              },
              sign: {
                type: 'string',
                title: '贡献',
                enum: ['第一作者', '第二作者'],
              },
            },
          },
        },
      },
    },
  },
]

export default {
  'GET /mock/schema': (_, res) => {
    res.send(schemas)
  },

  'GET /mock/schema/:id': ({ params: { id } }, res) => {
    res.send(schemas.find(schema => schema.id === id))
  },

  'POST /mock/schema/:id': ({ params: { id }, body }, res) => {
    const schema = {
      id,
      content: body,
    }
    schemas.push(schema)
    res.send(schema)
  },

  'PUT /mock/schema/:id': ({ params: { id }, body }, res) => {
    const schema = {
      id,
      content: body,
    }

    schemas = schemas.map(s => (s.id === id ? schema : s))
    res.send(schema)
  },

  'DELETE /mock/schema/:id': ({ params: { id } }, res) => {
    schemas = schemas.filter(s => s.id !== id)
    res.send(id)
  },
}
