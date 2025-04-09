import React, { useState } from "react";
import { Input, Row, Col, Menu, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";

// Separate CategoriesMenu component
const CategoriesMenu = ({ categories, onCategoryChange }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <>
      <Button
        icon={<MenuOutlined />}
        onClick={() => setDrawerVisible(true)}
        style={{ marginBottom: "20px" }}
      >
        Categories
      </Button>

      <Drawer
        title="Categories"
        placement="left"
        closable={true}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
      >
        <Menu
          onClick={(e) => {
            onCategoryChange(e.key);
            setDrawerVisible(false);
          }}
        >
          {categories.map((category) => (
            <Menu.Item key={category}>{category}</Menu.Item>
          ))}
        </Menu>
      </Drawer>
    </>
  );
};

export default CategoriesMenu;
