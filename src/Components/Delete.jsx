import React from "react";
import { Popconfirm, Button } from "antd";

const DeleteItem = ({ itemType, item, onDelete }) => {
  const handleDelete = () => {
    onDelete(item.key); 
  };

  const confirmTitle =
    itemType === "category"
      ? "Are you sure you want to delete this category?"
      : itemType === "store"
      ? "Are you sure you want to delete this store?"
      : "Are you sure you want to delete this product?";

  return (
    <Popconfirm
      title={confirmTitle}
      onConfirm={handleDelete}
      okText="Yes"
      cancelText="No"
    >
      <Button type="link" danger>
        Delete
      </Button>
    </Popconfirm>
  );
};

export default DeleteItem;
