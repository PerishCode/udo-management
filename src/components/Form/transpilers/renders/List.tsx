import { List as Antd_List } from 'antd'

const { Item } = Antd_List

export default function List({ schema, children }) {
  return Array.isArray(children) ? (
    <Antd_List>
      {children.map((child, index) => (
        <Item key={index}>
          <span className="serial">{index + 1}</span>
          {child}
        </Item>
      ))}
    </Antd_List>
  ) : (
    children
  )
}
