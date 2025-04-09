import React, { useState } from "react";
import { Card, Button, Modal, Typography } from "antd";
import { capitalizeFirstLetter } from "../utils/titleConversion";
import { updateProduct, deleteProduct } from "../services/productService";

const { Title, Text } = Typography;

const Product = ({
  product,
  approvePermission,
  removePermission,
  approved,
  onApprove,
  onRemove,
}) => {
  const { id, productName, quantity, costPerUnit } = product;
  const [showCartModal, setShowCartModal] = useState(false);
  const [productQuantity, setProductQuantity] = useState(quantity);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null);
  const [message, setMessage] = useState("");

  const handleConfirm = () => {
    if (confirmationAction) {
      confirmationAction();
    }
    setShowConfirmationModal(false);
  };

  const handleCancel = () => {
    setShowConfirmationModal(false);
    setConfirmationAction(null);
  };

  const approveProduct = async () => {
    try {
      await updateProduct(id, { status: "approved" });
      onApprove(id);
    } catch (error) {
      console.error("Failed to approve product:", error);
    }
  };

  const removeProduct = async () => {
    try {
      await deleteProduct(id);
      onRemove(id);
    } catch (error) {
      console.error("Failed to remove product:", error);
    }
  };

  const openConfirmationModal = (action) => {
    if (action === "approve") {
      setMessage(
        `Are you sure you want to approve the product "${productName}"?`
      );
      setConfirmationAction(() => approveProduct);
    } else if (action === "remove") {
      setMessage(
        `Are you sure you want to remove the product "${productName}"?`
      );
      setConfirmationAction(() => removeProduct);
    }
    setShowConfirmationModal(true);
  };

  const handleAddToCart = () => {
    setShowCartModal(true);
  };

  const handleClose = () => setShowCartModal(false);

  const updateQuantity = (newQuantity) => {
    setProductQuantity(newQuantity);
  };

  return (
    <>
      <Card
        title={capitalizeFirstLetter(productName)}
        style={{ width: 260, margin: 16 }}
      >
        <Text>Available quantity: {productQuantity}</Text>
        <br />
        <Text>Price per unit: {costPerUnit}</Text>
        <br />
        <Button
          type="primary"
          size="small"
          onClick={handleAddToCart}
          style={{ marginTop: 10 }}
        >
          Add to cart
        </Button>

        {approvePermission && !approved && (
          <Button
            type="default"
            size="small"
            onClick={() => openConfirmationModal("approve")}
            style={{ marginTop: 10 }}
          >
            Approve
          </Button>
        )}

        {((removePermission && !approved) || approvePermission) && (
          <Button
            type="danger"
            size="small"
            onClick={() => openConfirmationModal("remove")}
            style={{ marginTop: 10 }}
          >
            Remove
          </Button>
        )}
      </Card>

      <Modal
        visible={showConfirmationModal}
        onOk={handleConfirm}
        onCancel={handleCancel}
        title="Confirm Action"
      >
        <Text>{message}</Text>
      </Modal>
    </>
  );
};

export default Product;
