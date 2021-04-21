import { __render__ } from '@x-form/react'
import renders from './renders'
import HOC, { __depth__, __label__ } from './HOC'

Object.keys(renders).forEach(key => (renders[key] = HOC(renders[key])))

const {
  Input,
  Label,
  Options,
  Card,
  Link,
  Select,
  DatePicker,
  Divider,
  List,
} = renders

// const DataComponent = {
//   string: () => [Input],
//   date: () => [DatePicker],
//   link: () => [Link],
// }

// const BoxComponent = {
//   array: ({ [__depth__]: depth }) => [Options, depth === 0 ? Card : Divider],
//   object: ({ [__depth__]: depth }) => [depth === 0 ? Card : Divider],
// }

export default [
  schema => {
    const renders = schema[__render__]

    switch (schema.type) {
      case 'string':
        renders.push(schema.enum ? Select : Input)
        break
      case 'date':
        renders.push(DatePicker)
        break
    }
  },

  schema => {
    const renders = schema[__render__]
    const useLabel = schema[__label__]
    const depth = schema[__depth__]

    switch (schema.type) {
      case 'array':
        renders.push(Options)
        schema.display === 'list' && renders.push(List)
        useLabel && renders.push(depth === 0 ? Card : Divider)
        break
      case 'object':
        useLabel && renders.push(depth === 0 ? Card : Divider)
        break
      default:
        useLabel && renders.push(Label)
    }
  },
]
