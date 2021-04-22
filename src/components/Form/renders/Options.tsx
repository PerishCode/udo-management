import { Button } from 'antd'
import { PlusOutlined, CloseOutlined } from '@ant-design/icons'
import { aggregatedOperation as Do, __fragment__ } from '@x-form/react'

function Options({ schema, children }) {
  const { items, initialText } = schema

  return children.length === 0 ? (
    <Button
      block
      size="large"
      shape="round"
      onClick={() => Do(() => (schema.items = [{}]))}
    >
      {initialText || '初始化数据项'}
    </Button>
  ) : (
    children.map((child, index) => {
      const operators = [
        <Button
          key="create"
          onClick={_ => Do(() => items.splice(index + 1, 0, {}))}
          icon={<PlusOutlined />}
        />,
        <Button
          key="delete"
          onClick={_ => Do(() => items.splice(index, 1))}
          icon={<CloseOutlined />}
        />,
      ]
      return Array.isArray(child)
        ? child.concat(operators)
        : [child].concat(operators)
    })
  )
}

Options[__fragment__] = true

export default Options
