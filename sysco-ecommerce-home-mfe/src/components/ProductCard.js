import React, { useState, useEffect } from "react";
import { Card, Typography } from "antd";
import ProductModal from "../modals/ProductModal";

const { Title } = Typography;

const ProductCard = ({ product, cartId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    console.log("Hii", cartId);
  }, [cartId]); // This should now work

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Card
        hoverable
        style={{ width: 300, margin: 16 }}
        cover={
          <img
            alt={product.title}
            src={product.imageUrl}
            style={{ height: 200, objectFit: "contain" }}
          />
        }
        onClick={showModal} // Open modal on card click
      >
        <Card.Meta
          title={product.title}
          description={
            <Title level={5} style={{ margin: "8px 0 0" }}>
              ${product.price}
            </Title>
          }
        />
      </Card>

      <ProductModal
        cartId={cartId}
        visible={isModalVisible}
        onCancel={handleCancel}
        product={product}
      />
    </>
  );
};

export default ProductCard;
