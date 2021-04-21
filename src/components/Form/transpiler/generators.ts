import { __render__ } from '@x-form/react'
import renders from './renders'
import HOC from './HOC'

Object.keys(renders).forEach(key => (renders[key] = HOC(renders[key])))

const { Input, Label, Options, Card, Link, Select } = renders

const DataComponent = {
  string: () => [Input],
  link: () => [Link],
}

const BoxComponent = {
  string: () => [Label],
  link: () => [Label],
  array: () => [Options, Card],
  object: () => [Card],
}

export default [
  schema => {
    if (schema.enum) {
      schema[__render__].push(Select)
    } else {
      DataComponent[schema.type] &&
        schema[__render__].push(...DataComponent[schema.type]())
    }
  },

  schema => {
    BoxComponent[schema.type] &&
      schema[__render__].push(...BoxComponent[schema.type]())
  },
]
