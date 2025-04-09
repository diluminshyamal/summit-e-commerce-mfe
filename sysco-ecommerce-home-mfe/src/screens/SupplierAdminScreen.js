import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  Typography,
  message,
} from "antd";
import { addProduct } from "../services/productService";

const { Title } = Typography;
const { Option } = Select;

const SupplierAdminScreen = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const categories = [
    "Electronics",
    "Clothing",
    "Books",
    "Home & Kitchen",
    "Sports",
  ];

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Simulate API call to create product with image URL
      console.log("Product Details:", values);
      const res = await addProduct(values);
      message.success("Product created successfully!");
      form.resetFields();
    } catch (error) {
      message.error("Failed to create product. Please try again.");
      console.error("Error creating product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Create New Product</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ stock: 0 }}
      >
        <Form.Item
          name="name"
          label="Product Name"
          rules={[
            { required: true, message: "Please enter the product name!" },
          ]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select the category!" }]}
        >
          <Select placeholder="Select category">
            {categories.map((cat) => (
              <Option key={cat} value={cat}>
                {cat}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please enter the product description!",
            },
          ]}
        >
          <Input.TextArea rows={4} placeholder="Enter product description" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[
            { required: true, message: "Please enter the product price!" },
            {
              type: "number",
              min: 0,
              message: "Price must be a non-negative number!",
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            formatter={(value) =>
              `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace("₹ ", "").replace(/,/g, "")}
            placeholder="Enter product price"
          />
        </Form.Item>

        <Form.Item
          name="image"
          label="Image URL"
          rules={[
            { required: true, message: "Please enter the image URL!" },
            { type: "url", message: "Please enter a valid URL!" },
          ]}
        >
          <Input placeholder="Enter product image URL" />
        </Form.Item>

        <Form.Item
          name="stock"
          label="Stock Quantity"
          rules={[
            { required: true, message: "Please enter the stock quantity!" },
            {
              type: "integer",
              min: 0,
              message: "Stock must be a non-negative integer!",
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Enter stock quantity"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SupplierAdminScreen;
