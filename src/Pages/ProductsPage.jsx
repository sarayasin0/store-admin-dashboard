import React, { useState, useEffect } from 'react';
import { Layout, Button, Modal, Input, Select } from 'antd';
import Sidebar from '../Components/Sidebar';
import ProductForm from '../Components/ProductForm';
import ProductList from '../Components/ProductList';
import { v4 as uuidv4 } from 'uuid'; 
import { Header } from 'antd/es/layout/layout';

const { Content } = Layout;
const { Search } = Input;
const { Option } = Select;

const ProductPage = () => {
  const [visible, setVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    try {
      const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
      setProducts(storedProducts);
      setFilteredProducts(storedProducts);

      const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
      setCategories(storedCategories);
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
    const newProduct = { ...values, key: uuidv4() };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts); // Update filtered products
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setVisible(false);
  };

  const handleUpdate = (updatedProduct) => {
    const updatedProducts = products.map(product =>
      product.key === updatedProduct.key ? updatedProduct : product
    );
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts); // Update filtered products
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const handleDelete = (key) => {
    const filteredProducts = products.filter(product => product.key !== key);
    setProducts(filteredProducts);
    setFilteredProducts(filteredProducts); // Update filtered products
    localStorage.setItem('products', JSON.stringify(filteredProducts));
  };

  const handleSearch = (value) => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleCategorySelectChange = (value) => {
    if (value) {
      const filtered = products.filter(product => product.categoryId === value);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Reset to all products if no category is selected
    }
  };

  return (
    <Layout className="product-page">
      <Sidebar />
      <Layout>
        <Content className="content">
          <Header className='header'/>
          <Search 
            placeholder="Search products"
            onSearch={handleSearch}
            style={{ width: 400, marginBottom: '10px',borderRadius:'10px'}}
            size='middle'
            enterButton
          />
          <Select
            placeholder="Select category"
            onChange={handleCategorySelectChange}
            style={{ width: 400, marginBottom: '10px' ,marginLeft:'20px',borderRadius:'20px'}}
            size='middle'
            allowClear
          >
            {categories.map(category => (
              <Option key={category.key} value={category.key}>{category.name}</Option>
            ))}
          </Select>
          <br/>
          <Button type="primary" onClick={showModal} style={{margin:'10px'}} >
            Add Product
          </Button>
          <Modal
            title="Add New Product"
            open ={visible}
            onCancel={handleCancel}
            footer={null}
          >
            <ProductForm onSubmit={handleFormSubmit} onCancel={handleCancel} categories={categories} />
          </Modal>
          <ProductList products={filteredProducts} onUpdate={handleUpdate} onDelete={handleDelete} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProductPage;
