import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Typography,
  Card,
  Space,
  InputNumber,
  message,
  Spin,
  Modal,
  Result,
} from "antd";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { getCart } from "../services/cartService";
import OrderHistoryBox from "../components/OrderHistoryBox";

const { Title, Text } = Typography;

const CartScreen = ({ onUpdateCart }) => {
  const [cartItems, setCartItems] = useState([]);
  const [processedCartItems, setProcessedCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const cartId = localStorage.getItem("cartId");
  console.log("HII", cartId);

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        const data = await getCart(cartId);
        console.log("CARTTTTT--", data);
        setCartItems(data?.data?.data);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
        message.error("Failed to load cart. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [cartId]);

  useEffect(() => {
    if (cartItems) {
      const groupedItems = cartItems?.reduce((acc, item) => {
        if (item.productId) {
          const existingItem = acc?.find((i) => i.productId === item.productId);
          if (existingItem) {
            existingItem.quantity += item.quantity;
          } else {
            acc.push({ ...item });
          }
        } else {
          acc.push({ ...item });
        }
        return acc;
      }, []);
      setProcessedCartItems(groupedItems);
    }
  }, [cartItems]);

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      onUpdateCart(id, quantity);
    } else {
      message.error("Quantity must be greater than 0.");
    }
  };

  const handleRemove = (id) => {
    setProcessedCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  const handleCheckout = () => {
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: "Product ID",
      dataIndex: "productId",
      key: "productId",
      render: (text) => text || "N/A",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => handleQuantityChange(record.id, value)}
        />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Total",
      key: "total",
      render: (record) => `$${(record.price * record.quantity).toFixed(2)}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Button
          type="danger"
          icon={<DeleteOutlined />}
          onClick={() => handleRemove(record.id)}
        >
          Remove
        </Button>
      ),
    },
  ];

  const totalCartValue = processedCartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "24px" }}>
      <Card>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <ShoppingCartOutlined
            style={{ fontSize: "24px", marginRight: "12px" }}
          />
          <Title level={2}>Your Cart</Title>
        </div>
        {loading ? (
          <div style={{ textAlign: "center", padding: "50px 0" }}>
            <Spin size="large" />
          </div>
        ) : (
          <Table
            dataSource={processedCartItems}
            columns={columns}
            rowKey="id"
          />
        )}

        <div style={{ textAlign: "right", marginTop: "24px" }}>
          <Title level={4}>Total: ${totalCartValue.toFixed(2)}</Title>
          <Space>
            <Button type="primary" size="large" onClick={handleCheckout}>
              Checkout
            </Button>
          </Space>
        </div>
      </Card>
      <OrderHistoryBox />

      <Modal
        open={isModalVisible}
        footer={null}
        closable={false}
        onCancel={() => setIsModalVisible(false)}
      >
        <Result
          status="success"
          title="Purchase Successful!"
          subTitle="Thank you for shopping with us."
        />
      </Modal>
    </div>
  );
};

export default CartScreen;
