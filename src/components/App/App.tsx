import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import { Navbar, HomePage, Exchanges, Currencies, Details, News } from '../index';
import './App.css';

const App = () => {
  return (
    <div className='app'>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/exchanges' element={<Exchanges />} />
              <Route path='/cryptocurrencies' element={<Currencies />} />
              <Route path='/crypto/:coinId' element={<Details />} />
              <Route path='/news' element={<News />} />
            </Routes>
          </div>
        </Layout>
      </div>
      <div className="footer">
        <Typography.Title level={5} style={{ color: '#fff', textAlign: 'center' }}>
          Cryptoverse <br />
          All rights reserved
        </Typography.Title>
        <Space>
          <Link to='/'>Home</Link>
          <Link to='/exchanges'>Exchanges</Link>
          <Link to='/news'>News</Link>
        </Space>
      </div>
    </div>);
}

export default App;