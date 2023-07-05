import React, { useEffect, useState } from "react";
import Home from "../components/home/Home";
import { Route, Routes } from "react-router-dom";
import Login from "../components/auth/login.jsx";
import Registration from "../components/auth/Registration";
import ForgotPassword from "../components/auth/Forgot";
import { ProductListing } from "../ProductListing/ProductListing";
import { ProductDetails } from "../ProductDetails/ProductDetails";
import { Cart } from "../Cart/Cart";
// import { Checkout } from "../Checkout/Checkout";
import Checkout from "../checkout_order/checkout";
import { WishlistDetails } from "../wishlistDetails/WishlistDetails";

export const NavRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product-listing" element={<ProductListing />} />
      <Route path="/product-details/:productId" element={<ProductDetails />} />
      <Route path="/wishlist-details" element={<WishlistDetails />} />

      <Route path="/cart/:productId" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />

      {/* <Route path="/product-details/product" element={<ProductDetails />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Registration />} />
      <Route path="/forgot" element={<ForgotPassword />} />
    </Routes>
  );
};
