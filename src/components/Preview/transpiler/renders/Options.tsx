import { Button } from 'antd'
import { aggregatedOperation as Do, __fragment__ } from '@x-form/react'

function Options({ schema, children }) {
  const { items, initialText } = schema

  return children.length === 0 ? (
    <Button onClick={() => Do(() => (schema.items = [{}]))}>
      {initialText || '初始化数据项'}
    </Button>
  ) : (
    children.map((child, index) => {
      const operators = (
        <div key="operator">
          <Button onClick={_ => Do(() => items.splice(index + 1, 0, {}))}>
            创建
          </Button>
          <Button onClick={_ => Do(() => items.splice(index, 1))}>删除</Button>
        </div>
      )
      return Array.isArray(child)
        ? child.concat(operators)
        : [child].concat(operators)
    })
  )
}

Options[__fragment__] = true

export default Options
