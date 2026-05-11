import { Routes, Route, Link } from 'react-router-dom'
import { Layout, Menu, Typography } from 'antd'

const { Header, Content, Footer } = Layout
const { Title } = Typography

function Home() {
  return <Title level={3}>Home</Title>
}

function App() {
  const menuItems = [{ key: '/', label: <Link to='/'>Home</Link> }]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>
          POC
        </span>
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={['/']}
          items={menuItems}
        />
      </Header>

      <Content style={{ padding: '24px 48px' }}>
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
        </Routes>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        POC ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  )
}

export default App
