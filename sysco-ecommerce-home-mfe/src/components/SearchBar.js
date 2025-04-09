import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";

import { Input } from "antd";

const { Search } = Input;

// Search Bar Component
const SearchBar = () => {
  return (
    <Search
      placeholder="Search products..."
      onSearch={(value) => console.log(value)}
      style={{ width: 300, float: "left", marginLeft: "50px" }}
      suffix={<SearchOutlined />}
    />
  );
};

export default SearchBar;
