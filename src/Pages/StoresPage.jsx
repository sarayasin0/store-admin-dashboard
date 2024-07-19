import React, { useState, useEffect } from 'react';
import { Layout, Button, Modal } from 'antd';
import Sidebar from '../Components/Sidebar';
import StoreForm from '../Components/StoreForm';
import StoreList from '../Components/StoreList';
import { Header } from 'antd/es/layout/layout';

const { Content } = Layout;

const StorePage = () => {
  const [visible, setVisible] = useState(false);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const storedStores = JSON.parse(localStorage.getItem('stores')) || [];
    setStores(storedStores);
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleFormSubmit = (values) => {
    const newStore = { ...values, key: stores.length + 1 };
    const updatedStores = [...stores, newStore];
    setStores(updatedStores);
    localStorage.setItem('stores', JSON.stringify(updatedStores));
    setVisible(false);
  };

  const handleUpdate = (updatedStore) => {
    const updatedStores = stores.map(store =>
      store.key === updatedStore.key ? updatedStore : store
    );
    setStores(updatedStores);
    localStorage.setItem('stores', JSON.stringify(updatedStores));
  };

  const handleDelete = (key) => {
    const filteredStores = stores.filter(store => store.key !== key);
    setStores(filteredStores);
    localStorage.setItem('stores', JSON.stringify(filteredStores));
  };

  return (
    <Layout className="store-page">
      <Sidebar />
      <Layout>
        <Content className="content">
          <Header className='header'/>
          <Button type="primary" onClick={showModal}>
            Add Store
          </Button>
          <Modal
            title="Add New Store"
            open={visible}
            onCancel={handleCancel}
            footer={null}
          >
            <StoreForm onSubmit={handleFormSubmit} onCancel={handleCancel} />
          </Modal>
          
          <StoreList stores={stores} onUpdate={handleUpdate} onDelete={handleDelete} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default StorePage;
