export default {
  getAll() {
    return fetch('/api/schemas')
      .then(res => res.json())
      .then(res =>
        res.map(({ schemaName, schemaContent }) => ({
          id: schemaName,
          content: schemaContent,
        })),
      )

    // return fetch('/mock/schema').then(res => res.json())
  },
  get(id) {
    return fetch('/api/schemas/' + id)
      .then(res => res.json())
      .then(({ schemaName, schemaContent }) => ({
        id: schemaName,
        content: schemaContent,
      }))

    // return fetch('/mock/schema/' + id).then(res => res.json())
  },
  update(id, content) {
    return fetch('/mock/schema/' + id, {
      method: 'PUT',
      body: JSON.stringify(content),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(res => res.json())
  },
  create(id, content) {
    fetch('/api/schemas', {
      method: 'POST',
      body: JSON.stringify({
        schemaName: id,
        schemaContent: {
          ...content,
          title: id,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .then(console.log)

    return fetch('/mock/schema/' + id, {
      method: 'POST',
      body: JSON.stringify(content),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(res => res.json())
  },
}
