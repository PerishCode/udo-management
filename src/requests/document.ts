export default {
  getAll(search) {
    return fetch('/api/document' + search).then(res => res.json())
  },
}
