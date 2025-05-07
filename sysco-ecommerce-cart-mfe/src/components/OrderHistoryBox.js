import React, { useState, useEffect } from "react";
import { Card, Typography, Spin, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { getOrderByUserId } from "../services/orderService"; // Assuming you have this service

const { Title, Text } = Typography;

const OrderHistoryBox = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await getOrderByUserId("99999");
        console.log("ORDERS FETCHED:", data);
        setOrders(data?.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        message.error("Failed to load order history.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrders();
    } else {
      setLoading(false);
      console.warn("User ID not found in local storage.");
      // Optionally display a message to the user
    }
  }, [userId]);

  return (
    <Card
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <ShoppingCartOutlined style={{ marginRight: "8px" }} />
          <Title level={5} style={{ margin: 0 }}>
            Order History
          </Title>
        </div>
      }
      style={{
        width: 350, // Adjust width as needed
        marginBottom: "24px",
        border: "1px solid #d9d9d9",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
      }}
    >
      {loading ? (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <Spin size="small" />
        </div>
      ) : orders.length === 0 ? (
        <Text type="secondary">No past orders found.</Text>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              marginBottom: "16px",
              padding: "12px",
              border: "1px solid #e8e8e8",
              borderRadius: "6px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Text strong>Order ID: {order.id}</Text>
            {order.orderItems && order.orderItems.length > 0 ? (
              order.orderItems.map((item) => (
                <div
                  key={item.id}
                  style={{ marginLeft: "16px", marginTop: "8px" }}
                >
                  <Text>
                    Product ID: {item.productId}, Quantity: {item.quantity},
                    Price: ${item.price.toFixed(2)}, Total: $
                    {(item.price * item.quantity).toFixed(2)}
                  </Text>
                </div>
              ))
            ) : (
              <Text type="secondary" style={{ marginLeft: "16px" }}>
                No items in this order.
              </Text>
            )}
            <Text type="success" style={{ marginTop: "8px", display: "block" }}>
              Purchased
            </Text>
          </div>
        ))
      )}
    </Card>
  );
};

export default OrderHistoryBox;
