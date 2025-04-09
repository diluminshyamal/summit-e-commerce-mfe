import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductsView from "./components/ProductsView";
import Product from "./components/Product";
import AuthRoute from "./AuthRoute";
import ProductsScreen from "./screens/ProductsScreen";
import SupplierAdminScreen from "./screens/SupplierAdminScreen";

const App = () => {
  const userType = localStorage.getItem("userType");
  const [approvePermission, setApprovePermission] = useState(false);
  const [removePermission, setRemovePermission] = useState(false);
  const [shouldLoadSupplierAdmin, setShouldLoadSupplierAdmin] = useState(false);

  useEffect(() => {
    if (userType === "ADMIN" || userType === "SUPPLIER") {
      setShouldLoadSupplierAdmin(true);
    } else {
      setShouldLoadSupplierAdmin(false);
    }
  }, [userType]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <AuthRoute>
              {shouldLoadSupplierAdmin ? (
                <SupplierAdminScreen />
              ) : (
                <HomeScreen />
              )}
            </AuthRoute>
          }
        />
        <Route
          path="/products"
          exact
          element={
            <AuthRoute>
              <ProductsScreen />
            </AuthRoute>
          }
        />
        <Route
          path="/categories/:categoryId/:search"
          element={
            <AuthRoute>
              <ProductsView
                approvePermission={approvePermission}
                removePermission={removePermission}
              />
            </AuthRoute>
          }
        />
        {/* <Route
          path="/products/:productId/:search"
          element={
            <AuthRoute>
              <Product
                approvePermission = {approvePermission}
                removePermission = {removePermission}
                search = {search}
              />
            </AuthRoute>
          }
        /> */}
      </Routes>
    </>
  );
};

export default App;
