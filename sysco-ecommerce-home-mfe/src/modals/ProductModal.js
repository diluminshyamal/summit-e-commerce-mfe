import React, { useEffect, useState } from "react";
import { Typography, Modal, Button, InputNumber, message, Space } from "antd";
import { addItemstoCart } from "../services/cartService";

const { Title, Text } = Typography;

const ProductModal = ({ visible, onCancel, product, cartId }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = (value) => {
    if (value > product.stocks) {
      message.warning(`Only ${product.stocks} items available.`);
    }
    setQuantity(value);
  };

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      console.log(product);
      await addItemstoCart(cartId, quantity, product.price, product.id);
      message.success(`${product.title} added to cart successfully!`);
      onCancel(); // Close modal after success
    } catch (error) {
      message.error("Failed to add item to cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={product.title}
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>,
        <Button
          key="add"
          type="primary"
          loading={loading}
          onClick={handleAddToCart}
          disabled={quantity > product.stocks}
        >
          Add to Cart ({quantity})
        </Button>,
      ]}
    >
      <img
        alt={product.title}
        src={product.imageUrl}
        style={{
          width: "100%",
          borderRadius: "8px",
          marginBottom: "16px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      />
      <Text type="secondary">{product.description}</Text>
      <Title level={4} style={{ marginTop: "12px" }}>
        Price: <Text type="danger">${product.price}</Text>
      </Title>
      <div style={{ marginTop: "16px" }}>
        <Title level={5}>Quantity:</Title>
        <Space>
          <InputNumber
            min={1}
            max={product.stocks}
            value={quantity}
            onChange={handleQuantityChange}
          />
          <Text type="secondary">({product.stocks} available)</Text>
        </Space>
      </div>
    </Modal>
  );
};

export default ProductModal;
