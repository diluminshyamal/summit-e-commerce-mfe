import React, { useState } from "react";
import { Modal, Button, Form, Input, Select, message } from "antd";
import { addCategory } from "../services/productCategoryService";
import {
  addProduct,
  updateProduct,
  getProductByName,
} from "../services/productService";

const { Option } = Select;

const AddProductModal = ({
  show,
  handleClose,
  categories,
  handleAddCategory,
}) => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [productData, setProductData] = useState({
    productName: "",
    quantity: null,
    costPerUnit: null,
    status: "pending",
    categoryId: null,
  });

  const handleCloseConfirmationModal = () => setShowModal(false);

  const handleInputChange = (name, value) => {
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await getProductByName(
        productData.productName.toLowerCase()
      );
      if (response?.data.id) {
        const updateData = {
          ...productData,
          productName: productData.productName.toLowerCase(),
        };
        await updateProduct(response.data.id, updateData);
      }
    } catch (error) {
      console.error("Error occurred: ", error);
    }
    handleClose();
    handleCloseConfirmationModal();
  };

  const handleNewCategorySubmit = async () => {
    if (newCategory.trim()) {
      try {
        const response = await addCategory({
          categoryName: newCategory.toLowerCase(),
          status: "pending",
        });
        handleAddCategory(response.data);
        setNewCategory("");
        setShowAddCategory(false);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message || "An unexpected error occurred"
        );
      }
    } else {
      setErrorMessage("Category name cannot be empty.");
    }
  };

  const handleFormSubmit = async () => {
    const productDataToSend = {
      ...productData,
      productName: productData.productName.toLowerCase(),
    };
    try {
      await addProduct(productDataToSend);
      handleClose();
    } catch (error) {
      if (error.status === 409) {
        setShowModal(true);
      } else {
        setErrorMessage(
          error.response?.data?.message || "An unexpected error occurred"
        );
      }
    }
  };

  return (
    <>
      <Modal
        open={show}
        onCancel={handleClose}
        footer={null}
        title="Add New Product"
      >
        <Form layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item label="Product Name" required>
            <Input
              placeholder="Enter product name"
              value={productData.productName}
              onChange={(e) => handleInputChange("productName", e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Quantity" required>
            <Input
              type="number"
              placeholder="Enter quantity"
              value={productData.quantity}
              onChange={(e) => handleInputChange("quantity", e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Price per unit" required>
            <Input
              type="number"
              placeholder="Enter price per unit"
              value={productData.costPerUnit}
              onChange={(e) => handleInputChange("costPerUnit", e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Category" required>
            <Select
              value={productData.categoryId}
              onChange={(value) => {
                if (value === "add-new") {
                  setShowAddCategory(true);
                } else {
                  handleInputChange("categoryId", value);
                }
              }}
            >
              <Option value="">Select a category</Option>
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.categoryName}
                </Option>
              ))}
              <Option value="add-new">Add a New Category</Option>
            </Select>
          </Form.Item>

          {showAddCategory && (
            <>
              <Form.Item label="New Category Name" required>
                <Input
                  placeholder="Enter new category name"
                  value={newCategory}
                  onChange={(e) => {
                    setNewCategory(e.target.value);
                    setErrorMessage("");
                  }}
                />
              </Form.Item>
              <Button type="primary" onClick={handleNewCategorySubmit}>
                Add
              </Button>
              {errorMessage && (
                <div className="text-danger mt-2">{errorMessage}</div>
              )}
            </>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddProductModal;
