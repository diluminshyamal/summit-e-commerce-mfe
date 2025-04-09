import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Button, Typography, Card, Divider, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "../services/authService";

const { Title, Text } = Typography;

const LoginScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await login(values);
      console.log(response);

      if (response) {
        localStorage.setItem("userToken", response?.data?.data?.id);
        localStorage.setItem(
          "userType",
          response?.data?.data?.user["custom:role"]
        );
        message.success("Logged in successfully!");
        navigate("/");
      } else {
        message.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      message.error("Failed Authentication!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6dd5ed, #2193b0)",
      }}
    >
      <Card
        style={{
          width: 400,
          padding: 32,
          borderRadius: 8,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={2} style={{ color: "#2193b0" }}>
            Login
          </Title>
        </div>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
              style={{ backgroundColor: "#2193b0", borderColor: "#2193b0" }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <Divider />
        <div style={{ textAlign: "center" }}>
          <Text>
            Don't have an account? <Link to="/login/signup">Sign Up</Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default LoginScreen;
