import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";

const EditItem = ({ itemType, item, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    form.setFieldsValue(item); 
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
    onCancel();
  };

  const onFinish = (values) => {
    onSave({ ...item, ...values });
    setVisible(false);
    form.resetFields();
  };

  return (
    <>
      <Button type="link" onClick={showModal}>
        Edit
      </Button>
      <Modal
        title={`Edit ${itemType}`}
        open={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={item}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: `Please input ${itemType} name!` }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditItem;
