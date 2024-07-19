import React from 'react';
import { Layout, Menu } from 'antd';
import { ShopOutlined, AppstoreOutlined, TagsOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import logo from "../assets/images/logo.jpg";

const { Sider } = Layout;

const Siderbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const getItemStyle = (path) => {
    return {
      backgroundColor: currentPath === path ? '#e6f7ff' : 'transparent'
    };
  };

  return (
    <Sider width={200} className="sider" style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <div className="logo">
        <img src={logo} alt="logo" style={{ width: '100%' }} />
      </div>
      <Menu mode="inline" defaultSelectedKeys={['/']} selectedKeys={[currentPath]}>
        <Menu.Item key="/" icon={<ShopOutlined />} style={getItemStyle('/')}>
          <Link to="/">Stores</Link>
        </Menu.Item>
        <Menu.Item key="/categories" icon={<AppstoreOutlined />} style={getItemStyle('/categories')}>
          <Link to="/categories">Categories</Link>
        </Menu.Item>
        <Menu.Item key="/products" icon={<TagsOutlined />} style={getItemStyle('/products')}>
          <Link to="/products">Products</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Siderbar;

