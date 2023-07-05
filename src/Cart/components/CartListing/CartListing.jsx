/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import "./CartListing.css";

// import { useUserData } from "../../../../contexts/UserDataProvider";

export const CartListing = ({ item ,check,setCheck}) => {
  // const {
  //   userDataState,
  //   isProductInWishlist,
  //   removeFromCartHandler,
  //   wishlistHandler,
  //   cartCountHandler,
  //   cartLoading,
  // } = useUserData();

  const [local, setLocal] = useState([])

  useEffect(() => {
   const localData = JSON.parse(localStorage.getItem("cart_data"))
   setLocal(localData)
 }, []);

 const removeFromCartHandler = (id) => {
  const index = local.indexOf(id);
  console.log(index,"index")
if (index > -1) {
   local.splice(index, 1);
  setLocal(local)
  localStorage.setItem("cart_data",JSON.stringify(local))
  setCheck(!check)
}


}


  return (
    <div className="cart-products-container">
      {/* {userDataState.cartProducts.map((product) => ( */}
      {/* <div className="cart-product-card" key={product.id}> */}
      <div className="cart-product-card">
        <div>
          <img className="cart-img" alt="drip" src={item.img} />
        </div>
        <div className="product-description">
          <h3>{item.name}</h3>
          <p>$ {item.discounted_price}</p>
          <p>Size: {item.size}</p>
        </div>
        <div className="button-section">
          <div className="count-btn-container">
            <button
              //disabled={cartLoading}
              className="counter-btn"
              //onClick={() => cartCountHandler(product, "decrement")}
            >
              -
            </button>
            <span>1</span>
            <button
              //disabled={cartLoading}
              className="counter-btn"
              //onClick={() => cartCountHandler(product, "increment")}
            >
              +
            </button>
          </div>
          <div className="secondary-btn-section">
            <MdDelete
              size={25}
              onClick={() => removeFromCartHandler(item._id)}
            />

            {/* {!isProductInWishlist(product) ? ( */}
            <AiOutlineHeart
              size={25}
              //onClick={() => wishlistHandler(product)}
            />
            {/* ) : (
                <AiFillHeart
                  size={25}
                  onClick={() => wishlistHandler(product)}
                />
              )} */}
          </div>
        </div>
      </div>
      {/* ))} */}
    </div>
  );
};
