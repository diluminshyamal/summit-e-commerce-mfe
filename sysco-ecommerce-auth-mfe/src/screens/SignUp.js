import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Typography,
  Card,
  Divider,
  DatePicker,
  Select,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { signup } from "../services/authService";

const { Title, Text } = Typography;
const { Option } = Select;

const SignUpScreen = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const validatePassword = (_, value) => {
    if (!value) return Promise.reject("Please enter your password");
    if (
      !/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(value)
    ) {
      return Promise.reject(
        "Password must be at least 8 characters, include a letter, a number, and a special character"
      );
    }
    return Promise.resolve();
  };

  const handleSignUp = async (values) => {
    const formattedValues = {
      username: values.username,
      password: values.password,
      email: values.email,
      phone_number: values.phone_number,
      name: values.name,
      address: values.address,
      birthdate: values.birthdate.format("YYYY-MM-DD"),
      gender: values.gender,
      role: values.role,
    };
    try {
      await signup(formattedValues);
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f0f2f5",
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
          <Title level={2} style={{ color: "#1890ff" }}>
            Sign Up
          </Title>
        </div>
        <Form form={form} layout="vertical" onFinish={handleSignUp}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Full Name"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter a username" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ validator: validatePassword }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  return value === getFieldValue("password")
                    ? Promise.resolve()
                    : Promise.reject("Passwords do not match!");
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Birthdate"
            name="birthdate"
            rules={[{ required: true, message: "Please enter your birthdate" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              size="large"
              format="YYYY-MM-DD"
            />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select your gender" }]}
          >
            <Select placeholder="Select Gender" size="large">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone_number"
            rules={[
              { required: true, message: "Please enter your phone number" },
              {
                pattern: /^\+94\d{9}$/,
                message: "Phone number must be in +94XXXXXXXXX format",
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Phone Number"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter your address" }]}
          >
            <Input
              prefix={<HomeOutlined />}
              placeholder="Address"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select your role" }]}
          >
            <Select placeholder="Select Role" size="large">
              <Option value="CUSTOMER">Customer</Option>
              <Option value="ADMIN">Admin</Option>
              <Option value="SUPPLIER">Supplier</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <Divider />
        <div style={{ textAlign: "center" }}>
          <Text type="secondary">
            Already have an account? <Link to="/login">Log in</Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default SignUpScreen;
