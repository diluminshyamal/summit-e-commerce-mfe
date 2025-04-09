import React, { useState } from "react";
import { Layout, Menu, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { getProductByName } from "../../../sysco-ecommerce-home-mfe/src/services/productService";
import { HomeOutlined, ShoppingCartOutlined, LogoutOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Search } = Input;

const CustomNavbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleSearch = async () => {
    try {
      const result = await getProductByName(searchTerm);
      if (result.data) {
        const productId = result.data.id;
        navigate(`/categories/${productId}/${true}`);
      } else {
        console.warn("No products found");
        // Handle the case where no results are found
      }
    } catch (error) {
      console.error("Error searching for products:", error);
    }
  };

  return (
    <Header style={{ position: "sticky", top: 0, zIndex: 1, width: "100%", background: "#1890ff", color: "white" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ color: "white", fontSize: "1.5rem", marginRight: "20px" }}>
            Sysco E Com
          </div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]} style={{ background: "transparent", border: "none" }}>
            <Menu.Item key="1" onClick={() => navigate("/")} icon={<HomeOutlined />}>
              Home
            </Menu.Item>
            <Menu.Item key="2" onClick={() => navigate("/carts")} icon={<ShoppingCartOutlined />}>
              Cart
            </Menu.Item>
          </Menu>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Search
            placeholder="Search"
            allowClear
            onSearch={handleSearch}
            style={{ width: 200, marginRight: "10px" }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="text" style={{ color: "white" }} onClick={handleLogout} icon={<LogoutOutlined />}>
            Logout
          </Button>
        </div>
      </div>
    </Header>
  );
};

export default CustomNavbar;