import React, { Suspense } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { Layout, Spin } from 'antd';
import PractitionerList from './pages/PractitionerList';

const { Content } = Layout

const AppRouter = () => {
  return (
    <Suspense fallback={<Spin />}>
      <Layout>
        <Content style={{ margin: '24px 16px' }}>
          <Router>
            <Routes>
              <Route path="/" exact element={<PractitionerList />} />
            </Routes>
          </Router>
        </Content>
      </Layout>
    </Suspense>
  )
};

export default AppRouter;