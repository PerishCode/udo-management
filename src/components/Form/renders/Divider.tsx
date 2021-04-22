import { Divider as Antd_Divider } from 'antd'

export default function Divider({ schema: { title }, children }) {
  return (
    <div>
      <Antd_Divider orientation="center">{title}</Antd_Divider>
      <div>{children}</div>
    </div>
  )
}
