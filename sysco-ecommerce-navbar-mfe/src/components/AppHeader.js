import React from "react";
import { Layout, Menu, Button } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const { Header } = Layout;

const AppHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("cartId");
    localStorage.removeItem("userType");
    navigate("/login");
  };

  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Brand Name */}
      <div style={{ fontSize: "28px", fontWeight: "bold", color: "#3f3f3f" }}>
        Sysco Shop
      </div>

      {/* Menu Items */}
      <Menu
        theme="light"
        mode="horizontal"
        style={{
          display: "flex",
          justifyContent: "center",
          flex: 1,
          marginLeft: "30px",
          fontWeight: "500",
        }}
      >
        <Menu.Item
          key="home"
          style={{ fontSize: "16px", margin: "0 15px" }}
          className="nav-item"
        >
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item
          key="categories"
          style={{ fontSize: "16px", margin: "0 15px" }}
          className="nav-item"
        >
          <Link to="/products">Products</Link>
        </Menu.Item>
      </Menu>

      {/* User, Cart & Logout Buttons */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button
          icon={<ShoppingCartOutlined />}
          style={{
            marginRight: "10px",
            borderRadius: "8px",
            border: "1px solid #dcdcdc",
            padding: "8px 16px",
            fontSize: "16px",
            backgroundColor: "#f5f5f5",
            color: "#333",
            transition: "all 0.3s ease",
          }}
          className="header-btn"
        >
          <Link to="/carts" style={{ color: "#333" }}>
            Cart
          </Link>
        </Button>
        <Button
          icon={<UserOutlined />}
          style={{
            marginRight: "10px",
            borderRadius: "8px",
            border: "1px solid #dcdcdc",
            padding: "8px 16px",
            fontSize: "16px",
            backgroundColor: "#f5f5f5",
            color: "#333",
            transition: "all 0.3s ease",
          }}
          className="header-btn"
        >
          <Link to="/login" style={{ color: "#333" }}>
            Account
          </Link>
        </Button>
        <Button
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          style={{
            borderRadius: "8px",
            border: "1px solid #dcdcdc",
            padding: "8px 16px",
            fontSize: "16px",
            backgroundColor: "#f5f5f5",
            color: "#333",
            transition: "all 0.3s ease",
          }}
          className="header-btn"
        >
          Logout
        </Button>
      </div>
    </Header>
  );
};

export default AppHeader;
