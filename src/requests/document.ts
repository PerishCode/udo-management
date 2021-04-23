export default {
  getAll(search) {
    return fetch('/api/document' + search).then(res => res.json())
  },
  get(id) {
    return fetch('/api/document/' + id).then(res => res.json())
  },
  update(id, content) {
    return fetch('/api/document/' + id, {
      method: 'PUT',
      body: JSON.stringify(content),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(res => res.json())
  },
  create(search, content) {
    return fetch('/api/document' + search, {
      method: 'POST',
      body: JSON.stringify(content),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(res => res.json())
  },
}
