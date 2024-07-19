import React from 'react';
import { Button, Form, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const StoreForm = ({ onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onSubmit(values); 
    form.resetFields(); 
  };

  const customRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Image"
        name="img"
        valuePropName="fileList"
        getValueFromEvent={(e) => {
          if (Array.isArray(e)) {
            return e;
          }
          return e && e.fileList;
        }}
      >
        <Upload
          customRequest={customRequest}
          maxCount={1}
          listType="picture"
          accept=".png,.jpg,.jpeg"
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
          Submit
        </Button>
        <Button onClick={onCancel}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default StoreForm;
