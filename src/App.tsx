import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import Orders from './pages/Orders'

const { Header, Content, Footer } = Layout

export default function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>
          POC
        </span>
      </Header>

      <Content style={{ padding: '24px 48px' }}>
        <Routes>
          <Route
            path='/'
            element={<Orders />}
          />
        </Routes>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        POC ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  )
}
