import { SchemaRQ } from '.'

/* '?schema=Author' => 'Author' */
function getSchemaFromSearch(search) {
  return Object.fromEntries(new URLSearchParams(search)).schema
}

function getDocumentQuery(documentId, schemaId, schemaContent) {
  return (
    `{
    ${schemaId}(
      udoi:"${documentId}"
    ){
  ` +
    Object.keys(schemaContent.properties)
      .map(key => key)
      .join('\n') +
    `
    }
  }`
  )
}

function getDocumentsQuery(schemaId, schemaContent) {
  return (
    `{
      ${schemaId}Documents{
        udoi
    ` +
    Object.keys(schemaContent.properties)
      .map(key => key)
      .join('\n') +
    ` }
    }`
  )
}

function createDocumentQuery(schemaId, schemaContent, documentContent) {
  return (
    `{
      new${schemaId}(
          udoi:"${String(Math.floor(Math.random() * 1000000)).padStart(
            6,
            '0',
          )}",
          content:{
    ` +
    Object.keys(documentContent)
      .map(key => `${key}:"${documentContent[key]}"`)
      .join('\n') +
    `
          },
          schemaId:"${schemaId}"
      ){
        udoi
    ` +
    Object.keys(schemaContent.properties)
      .map(key => key)
      .join('\n') +
    `
      }
    }`
  )
}

function execute(query) {
  return fetch('/api/documents/query', {
    method: 'POST',
    body: query,
    headers: new Headers({
      'Content-Type': 'text/plain',
    }),
  })
}

export default {
  getAll(search) {
    const schemaId = getSchemaFromSearch(search)

    return SchemaRQ.get(schemaId)
      .then(({ content }) => execute(getDocumentsQuery(schemaId, content)))
      .then(res => res.json())
      .then(({ [schemaId + 'Documents']: documents }) =>
        documents.map(document => {
          const id = document.udoi
          delete document.udoi
          return {
            id,
            schema: schemaId,
            content: document,
          }
        }),
      )

    // return fetch('/mock/document' + search).then(res => res.json())
  },
  get(documentId, schemaId, schemaContent) {
    return execute(getDocumentQuery(documentId, schemaId, schemaContent))
      .then(res => res.json())
      .then(({ [schemaId]: content }) => ({
        id: documentId,
        schema: schemaId,
        content,
      }))
    // return fetch('/mock/document/' + id).then(res => res.json())
  },
  update(id, content) {
    return fetch('/mock/document/' + id, {
      method: 'PUT',
      body: JSON.stringify(content),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(res => res.json())
  },
  create(search, content) {
    const schemaId = getSchemaFromSearch(search)

    return SchemaRQ.get(schemaId)
      .then(({ content: schemaContent }) =>
        execute(createDocumentQuery(schemaId, schemaContent, content)),
      )
      .then(res => res.json())
      .then(({ ['new' + schemaId]: documentContent }) => documentContent)

    // return fetch('/mock/document' + search, {
    //   method: 'POST',
    //   body: JSON.stringify(content),
    //   headers: new Headers({
    //     'Content-Type': 'application/json',
    //   }),
    // }).then(res => res.json())
  },
  delete(id) {
    return fetch('/mock/document/' + id, {
      method: 'DELETE',
    }).then(res => res.text())
  },
}
