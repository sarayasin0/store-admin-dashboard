import React, { useState, useEffect } from 'react';
import { Layout, Button, Modal, Input,Select } from 'antd';
import Sidebar from '../Components/Sidebar';
import CategoryForm from '../Components/CategoryForm';
import CategoryList from '../Components/CategoryList';
import { v4 as uuidv4 } from 'uuid'; 

const { Content } = Layout;
const { Search } = Input;
const {Option}=Select;
const {Header}=Layout;
const CategoryPage = () => {
  const [visible, setVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);  
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null); 

  useEffect(() => {
    try {
      const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
      setCategories(storedCategories);
      setFilteredCategories(storedCategories);

      const storedStores = JSON.parse(localStorage.getItem('stores')) || [];
      setStores(storedStores);
    } catch (error) {
      console.error("Error parsing localStorage data", error);
    }
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleFormSubmit = (values) => {
    const newCategory = { ...values, key: uuidv4() };
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    setFilteredCategories(updatedCategories); // Update filtered categories
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    setVisible(false);
  };

  const handleUpdate = (updatedCategory) => {
    const updatedCategories = categories.map(category =>
      category.key === updatedCategory.key ? updatedCategory : category
    );
    setCategories(updatedCategories);
    setFilteredCategories(updatedCategories); // Update filtered categories
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
  };

  const handleDelete = (key) => {
    const filteredCategories = categories.filter(category => category.key !== key);
    setCategories(filteredCategories);
    setFilteredCategories(filteredCategories); // Update filtered categories
    localStorage.setItem('categories', JSON.stringify(filteredCategories));
  };

  const handleSearch = (value) => {
    const filtered = categories.filter(category =>
      category.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCategories(filtered);
  };
  
  const handleStoreSelectChange = (value) => {
    setSelectedStore(value); // Update selected store
    if (value) {
      const filtered = categories.filter(category => category.storeId === value);
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories); // Reset to all categories if no store is selected
    }
  };

  return (
    <Layout className="category-page">
      <Sidebar />
      <Layout>
        <Content className="content">
          <Header className='header'/>
        <Search
            placeholder="Search categories"
            onSearch={handleSearch}
            style={{ width: 400,marginBottom:'10px'}}
            size='middle'
            enterButton
          /> 
          <Select
            placeholder="Select store"
            onChange={handleStoreSelectChange}
            style={{ width: 400, marginBottom: '10px' ,marginLeft:'20px'}}
            size='middle'
            allowClear
          >
            {stores.map(store => (
              <Option key={store.key} value={store.key}>{store.name}</Option>
            ))}
          </Select>
          <br/>
          <Button type="primary" onClick={showModal} style={{margin:'10px'}}>
            Add Category
          </Button>
          <Modal
            title="Add New Category"
            open={visible}
            onCancel={handleCancel}
            footer={null}
          >
            <CategoryForm onSubmit={handleFormSubmit} onCancel={handleCancel} stores={stores} />
          </Modal>
          <CategoryList categories={filteredCategories} onUpdate={handleUpdate} onDelete={handleDelete} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default CategoryPage;
