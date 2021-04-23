import { useEffect, useState } from 'react'
import { history } from 'umi'
import { Layout, Menu } from 'antd'
import { SchemaRQ } from '@/requests'
import { Icon } from '@/components'

import 'jsoneditor/dist/jsoneditor.css'
import './index.less'

const { Content, Sider } = Layout
const { Item, SubMenu } = Menu

export default function BasicLayout({ children }) {
  const [collapsed, setCollapsed] = useState(true)
  const [schemas, setSchemas] = useState([] as any)

  useEffect(() => {
    SchemaRQ.getAll().then(setSchemas)
  }, [])

  return (
    <Layout className="basic">
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <Menu theme="dark" mode="inline">
          <Item
            icon={<Icon type="u-schema" />}
            onClick={() => history.push('/schema')}
          >
            Schema管理
          </Item>
          <SubMenu icon={<Icon type="u-document" />} title="Document管理">
            {schemas.map(s => (
              <Item
                key={s.id}
                onClick={() => {
                  history.push('/document?schema=' + s.id)
                  location.reload()
                }}
              >
                {s.id}
              </Item>
            ))}
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  )
}
