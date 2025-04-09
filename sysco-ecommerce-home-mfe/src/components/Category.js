import React, { useState } from "react";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../utils/titleConversion";
import {
  updateCategory,
  deleteCategory,
} from "../services/productCategoryService";

const Category = ({
  category,
  image,
  approvePermission,
  removePermission,
  approved,
  onApprove,
  onRemove,
}) => {
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

  const approveCategory = async () => {
    try {
      await updateCategory(category.id, { status: "approved" });
      onApprove(category.id);
    } catch (error) {
      console.error("Failed to approve category:", error);
    }
  };

  const removeCategory = async () => {
    try {
      const response = await deleteCategory(category.id);
      onRemove(category.id);
    } catch (error) {
      console.error("Failed to remove product:", error);
    }
  };

  const openConfirmationModal = (action) => {
    if (action === "approve") {
      setMessage(
        `Are you sure you want to approve the product "${category.categoryName}"?`
      );
      setConfirmationAction(() => approveCategory);
    } else if (action === "remove") {
      setMessage(
        `Are you sure you want to remove the product "${category.categoryName}"?`
      );
      setConfirmationAction(() => removeCategory);
    }
    setShowConfirmationModal(true);
  };

  return (
    <>
      <Link
        to={`/categories/${category.id}/${false}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div
          style={{
            border: "1px solid #ccc",
            padding: "16px",
            margin: "16px",
            width: "200px",
            cursor: "pointer",
          }}
        >
          <img
            src={image}
            alt={category.category_name}
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />

          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
            {capitalizeFirstLetter(category.categoryName)}
          </span>

          <div style={{ marginTop: "8px" }}>
            {approvePermission && !approved && (
              <button
                style={{ marginRight: "8px" }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openConfirmationModal("approve");
                }}
                className="btn btn-success btn-sm"
              >
                Approve
              </button>
            )}
            {((removePermission && !approved) || approvePermission) && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openConfirmationModal("remove");
                }}
                className="btn btn-danger btn-sm"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </Link>
    </>
  );
};

export default Category;
