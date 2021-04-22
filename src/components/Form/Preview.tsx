import { __render__ } from '@x-form/react'
import XForm, { TranspilerFactory } from '@x-form/react-jsonschema'
import { __depth__, __label__ } from './HOC'
import renders from './renders'

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

const generators = [
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

const injectors = [
  // 计算数据项深度并赋值
  (schema, params) => {
    const depth = params[__depth__] ?? 0
    schema[__depth__] = depth
    params[__depth__] = depth + 1
  },
  // 判断是否为 title 属性插入容器组件
  (schema, params) => {
    const { display, type } = schema
    schema[__label__] = params[__label__] ?? true
    type === 'array' && display !== undefined && (params[__label__] = false)
  },
]

const transpile = TranspilerFactory({
  injectors,
  generators,
})

export default function Preview({
  schema,
  className,
  formData = null,
  onChange = _ => {},
}) {
  return (
    <XForm
      schema={schema}
      formData={formData}
      onChange={onChange}
      className={className}
      extensions={{ transpile }}
    />
  )
}
