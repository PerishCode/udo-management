import { Select as Antd_Select } from 'antd'
import { aggregatedOperation as Do } from '@x-form/react'

const { Option } = Antd_Select

export default function Select({ schema }) {
  return (
    <Antd_Select
      value={schema.data}
      onChange={(v: any) =>
        Do(() => {
          schema.data = v
        })
      }
    >
      {/* <Option value="">-------</Option> */}
      {schema.enum.map((item, index) => (
        <Option value={item} key={index}>
          {item}
        </Option>
      ))}
    </Antd_Select>
  )
}
