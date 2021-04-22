export default {
  getAll() {
    return fetch('/api/schema').then(res => res.json())
  },
  get(id) {
    return fetch('/api/schema/' + id).then(res => res.json())
  },
  update(id, content) {
    return fetch('/api/schema/' + id, {
      method: 'PUT',
      body: JSON.stringify(content),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(res => res.json())
  },
  create(id, content) {
    return fetch('/api/schema/' + id, {
      method: 'POST',
      body: JSON.stringify(content),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(res => res.json())
  },
}
