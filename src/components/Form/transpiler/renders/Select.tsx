import { aggregatedOperation as Do } from '@x-form/react'

export default function Select({ schema }) {
  console.log(schema)

  return (
    <select
      value={schema.data || ''}
      onChange={(e: any) =>
        Do(() => {
          schema.data = e.target.value
        })
      }
    >
      <option value="">请选择</option>
      {schema.enum.map((item, index) => (
        <option value={item} key={index}>
          {item}
        </option>
      ))}
    </select>
  )
}
