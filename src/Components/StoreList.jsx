import React from "react";
import { Table, Space, Image } from "antd";
import EditItem from "./Edit";
import DeleteItem from "./Delete";

const StoreList = ({ stores, onUpdate, onDelete }) => {
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
      render: img => (
        img && img.length > 0 
          ? <Image src={img[0].thumbUrl} alt="Store" style={{ maxWidth: '100px' }} />
          : 'No Image'
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <EditItem itemType="store" item={record} onSave={onUpdate} onCancel={() => {}} />
          <DeleteItem itemType="store" item={record} onDelete={onDelete} />
        </Space>
      ),
    },
  ];

  return (
    <Table
      className="storelist"
      dataSource={stores}
      columns={columns}
      rowKey="id"
    />
  );
};

export default StoreList;
