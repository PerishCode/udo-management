export default {
  getAll() {
    return fetch('/api/schema').then(res => res.json())
  },
}
