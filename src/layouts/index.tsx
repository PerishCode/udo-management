import { useState } from 'react'
import { history } from 'umi'
import { Layout, Menu } from 'antd'
import { Icon } from '@/components'
import './index.less'

const { Content, Sider } = Layout
const { Item, SubMenu } = Menu

function Link(title: string, icon: string, url: string) {
  return (
    <Item icon={<Icon type={icon} />} onClick={() => history.push(url)}>
      {title}
    </Item>
  )
}

export default function BasicLayout({ children }) {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <Layout className="basic">
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <Menu theme="dark" mode="inline">
          {Link('Schema管理', 'iconschema', '/schema')}
        </Menu>
      </Sider>
      <Layout>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  )
}
