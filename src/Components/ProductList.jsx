import React from 'react';
import { Table, Space,Image } from 'antd';
import EditItem from './Edit';
import DeleteItem from './Delete';
import { getCategories, getStores } from '../Pages/localStorage'; // Adjust path as per your project structure

const ProductList = ({ products, onUpdate, onDelete }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => {
        if (typeof price === 'number') {
          return `$${price.toFixed(2)}`;
        }
        return 'N/A'; // Or any default value when price is undefined
      },
    },
    {
      title: 'Image',
      dataIndex: 'img',
      key: 'img',
      render: (img) => {
        if (img && img.length > 0) {
          return (
            <Image
              src={img[0].thumbUrl}
              alt="Product"
              style={{ maxWidth: '100px' }}
            />
          );
        }
        return 'No Image';
      },
    },
    {
      title: 'Category',
      dataIndex: 'categoryId',
      key: 'categoryId',
      render: (categoryId) => {
        const categories = getCategories() || [];
        const category = categories.find(cat => cat.key === categoryId);
        return category ? category.name : 'Unknown Category';
      },
    },
    {
      title: 'Store',
      dataIndex: 'categoryId', 
      key: 'storeId',
      render: (categoryId) => {
        const categories = getCategories() || [];
        const stores = getStores() || [];
        const category = categories.find(cat => cat.key === categoryId);
        if (category) {
          const store = stores.find(store => store.key === category.storeId);
          return store ? store.name : 'Unknown Store';
        }
        return 'Unknown Store';
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <EditItem itemType="product"  item={record} onSave={onUpdate} onCancel={() => {}} />
          <DeleteItem itemType="product" item={record} onDelete={onDelete} />
        </Space>
      ),
    },
  ];

  return (
    <Table
    className='productList'
      dataSource={products}
      columns={columns}
      rowKey="key"
      pagination={false}
    />
  );
};

export default ProductList;
