import { __depth__, __label__ } from './HOC'

export default [
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
    type === 'array' && display === 'table' && (params[__label__] = false)
  },
]
