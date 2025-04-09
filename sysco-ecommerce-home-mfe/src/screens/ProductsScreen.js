import React, { useEffect, useState } from "react";
import { Input, Row, Col, Spin, Typography } from "antd";
import ProductCard from "../components/productCard";
import CategoriesMenu from "../components/Categories";
import { getProducts } from "../services/productService";
import log from "loglevel";

const { Search } = Input;
const { Title } = Typography;

const fetchProducts = async (setProducts, setLoading) => {
  setLoading(true);
  try {
    const res = await getProducts();
    setProducts(res?.data?.data?.content || []);
  } catch (error) {
    log.error("Failed to fetch products", error);
  } finally {
    setLoading(false);
  }
};

const ProductsScreen = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [cartId, setCartId] = useState();

  useEffect(() => {
    fetchProducts(setProducts, setLoading);
    setCartId(localStorage.getItem("cartId"));
  }, []);

  // Filter products based on search query and category
  const filteredProducts = products.filter((product) => {
    const searchMatch = product.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const categoryMatch =
      categoryFilter === "All" || product.category === categoryFilter;
    return searchMatch && categoryMatch;
  });

  // Get unique categories
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

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
    <div style={{ padding: "20px" }}>
      <Title level={1} style={{ textAlign: "center", marginBottom: "20px" }}>
        Products
      </Title>

      {/* Categories Menu Component */}
      <CategoriesMenu
        categories={categories}
        onCategoryChange={setCategoryFilter}
      />

      {/* Search Bar */}
      <div style={{ maxWidth: "400px", margin: "0 auto 20px" }}>
        <Search
          placeholder="Search products..."
          enterButton
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Product Grid */}
      <Row gutter={[16, 16]} justify="center">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
              <ProductCard
                cartId={cartId}
                product={{
                  ...product,
                  title: product.name,
                  id: product.id,
                  imageUrl: product?.image,
                  stocks: product.stock,
                }}
              />
            </Col>
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%" }}>
            No products found
          </p>
        )}
      </Row>
    </div>
  );
};

export default ProductsScreen;
