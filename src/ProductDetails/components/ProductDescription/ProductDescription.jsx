import "./ProductDescription.css";
import React, { useState, useEffect } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { useUserData } from "../../../contexts/UserDataProvider";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import LoginModal from "../../../components/auth/LoginModal";

export const ProductDescription = ({ selectedProduct }) => {
  // const {
  //   addToCartHandler,
  //   wishlistHandler,
  //   isProductInCart,
  //   isProductInWishlist,
  //   cartLoading,
  // } = useUserData();
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  let email = localStorage.getItem("user_email");
  const [open, setOpen] = React.useState(false);
  const [stat, setStat] = React.useState("warning");
  const [openMOdal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const [loggedFlag, seloggedFlag] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
    if (email) {
      setLogin(true);
    }
  }, [loggedFlag]);

  return (
    <div className="product-details-description">
      <h1 className="product-name">{selectedProduct?.name}</h1>

      <div className="ratings-reviews">
        <span></span>
        <span>{selectedProduct?.rating}</span>{" "}
        <BsFillStarFill color={"orange"} />
        <span>
          <span className="review">({selectedProduct?.reviews}) reviews </span>
        </span>
      </div>

      <div className="product-price-container">
        <span className="product-original-price">
          ₹{selectedProduct?.original_price}{" "}
        </span>
        <span className="product-discount-price">
          {" "}
          ₹{selectedProduct?.discounted_price}
        </span>
      </div>

      <p className="description-container">
        <span>Description</span>: {selectedProduct?.description}
      </p>

      <span className="gender-container">
        <span>Gender</span>: {selectedProduct?.category_name}
      </span>
      <p className="size-container">
        <span>Size</span>: {selectedProduct?.size}
      </p>

      <div className="tags">
        {!selectedProduct?.is_stock && (
          <span className="out-of-stock">
            {selectedProduct?.is_stock ? "In Stock" : "Out of stock"}
          </span>
        )}
        {selectedProduct?.trending && (
          <span className="trending">
            {selectedProduct?.trending ? "Trending" : ""}
          </span>
        )}
      </div>
      <div className="product-card-buttons-container">
        <button
          //disabled={cartLoading}
          //onClick={() => addToCartHandler(selectedProduct)}
          className="add-to-cart-btn"
          onClick={() => {
            if (login) {
              navigate(`/cart/${selectedProduct?._id}`);
              handleClick();
            } else {
              setTimeout(() => {
                setStat("warning");
                handleOpenModal();
              }, [2000]);
              handleClick();
              errorMessage();
            }
          }}
        >
          {/* {!isProductInCart(selectedProduct) ? "Add to cart" : "Go to cart"} */}
          Add to cart
        </button>
        {console.log(selectedProduct?._id, "jk")}
        <button
          // disabled={cartLoading}
          // onClick={() => wishlistHandler(selectedProduct)}
          className="add-to-wishlist-btn"
        >
          {/* {!isProductInWishlist(selectedProduct)
            ? "Add to wishlist"
            : "Remove from wishlist"} */}
          Add to wishlist
        </button>
      </div>
      <LoginModal
        openMOdal={openMOdal}
        setOpenModal={setOpenModal}
        seloggedFlag={seloggedFlag}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        anchorPosition={{ left: 10, top: 300 }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        {stat == "warning" ? (
          <Alert
            onClose={handleClose}
            severity={"warning"}
            sx={{ width: "100%" }}
          >
            "Please login 🥺{" "}
          </Alert>
        ) : (
          <Alert
            onClose={handleClose}
            severity={"error"}
            sx={{ width: "100%" }}
          >
            Success
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};
