import React from 'react';
import { Table, Space ,Image} from 'antd';
import EditItem from './Edit';
import DeleteItem from './Delete';
import { getStores } from '../Pages/localStorage';

const CategoryList = ({ categories, onUpdate, onDelete }) => {
  const stores = getStores() || []; 
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
              alt="Category"
              style={{ maxWidth: '100px' }}
            />
          );
        }
        return 'No Image';
      },
    },
    {
      title: 'Store',
      dataIndex: 'storeId',
      key: 'storeId',
      render: (storeId) => {
        const store = stores.find((store) => store.key === storeId);
        return store ? store.name : 'Unknown Store'; // Ensure correct matching
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <EditItem
            itemType="category"
            item={record}
            onSave={onUpdate}
            onCancel={() => {}}
          />
          <DeleteItem itemType="category" item={record} onDelete={onDelete} />
        </Space>
      ),
    },
  ];

  return (
    <Table
    className='categoryList'
      dataSource={categories}
      columns={columns}
      rowKey="key"
    />
  );
};

export default CategoryList;
