import React from 'react';
import { Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined } from '@ant-design/icons';
// import icon from '../../images/logo.png';
 
export const Navbar = () => {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src="https://picsum.photos/100" />
        <Typography.Title level={2} className="logo">
          <Link to="/">Cryptoverse</Link>
        </Typography.Title>
      </div>
      <Menu theme='dark'>
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to='/'>Home</Link>
        </Menu.Item>
        <Menu.Item key="cryptocurrencies" icon={<FundOutlined />}>
          <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
        </Menu.Item>
        <Menu.Item key="exchanges" icon={<MoneyCollectOutlined />}>
          <Link to='/exchanges'>Exchanges</Link>
        </Menu.Item>
        <Menu.Item key="news" icon={<BulbOutlined />}>
          <Link to='/news'>News</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};
