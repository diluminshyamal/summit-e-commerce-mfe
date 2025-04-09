import React, { useEffect, useState } from "react";
import { Row, Typography, Spin } from "antd";
import ProductCard from "./productCard";
import { getProducts } from "../services/productService";
import log from "loglevel";

const { Title } = Typography;

const FeaturedProducts = ({ cartId }) => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await getProducts();
        setProduct(res?.data?.data?.content || []);
      } catch (error) {
        log.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    console.log(product);
  }, [product]);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ marginTop: "40px" }}>
      <Title level={2}>Featured Products</Title>
      <Row gutter={[16, 16]}>
        {product.map((item) => (
          <ProductCard
            cartId={cartId}
            key={item.id}
            product={{
              title: item.name,
              id: item.id,
              imageUrl:
                item.image || "https://via.placeholder.com/200?text=No+Image",
              description: item.description,
              price: item.price,
              stocks: item.stock,
            }}
          />
        ))}
      </Row>
    </div>
  );
};

export default FeaturedProducts;
