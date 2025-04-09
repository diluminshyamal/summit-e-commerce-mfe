import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductsInCategory } from "../services/productCategoryService";
import Product from "./Product";
import { getProductById } from "../services/productService";

const ProductsView = ({ approvePermission, removePermission }) => {
  const { categoryId, search } = useParams();
  const [products, setProducts] = useState([]);

  const isSearchTrue = search === "true";

  const fetchProducts = async () => {
    if (isSearchTrue) {
      const productId = categoryId;
      const product = await getProductById(productId);
      setProducts([product.data]);
    } else {
      try {
        const response = await getProductsInCategory(categoryId);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    }
  };

  const handleApprove = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, status: "approved" } : product
      )
    );
  };

  const handleRemove = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryId]);

  if (!products || products.length === 0) {
    return <div>Products not found!</div>;
  }

  return (
    <div className="d-flex flex-wrap px-4">
      {products.map(
        (product) =>
          (product.status === "approved" ||
            approvePermission ||
            removePermission) && (
            <Product
              key={product.id}
              product={product}
              approvePermission={approvePermission}
              removePermission={removePermission}
              approved={product.status === "approved"}
              onApprove={handleApprove}
              onRemove={handleRemove}
            />
          )
      )}
    </div>
  );
};

export default ProductsView;
