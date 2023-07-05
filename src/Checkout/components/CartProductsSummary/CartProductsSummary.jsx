import "./CartProductsSummary.css";

import React from "react";
export const CartProductsSummary = ({ item }) => {
  // const { userDataState } = useUserData();
  console.log(item, "itemitem");
  return (
    <div className="product-details-container">
      <div className="ordered-products-container">
        {/* {userDataState.cartProducts?.map(
          ({ id, img, name, qty, discounted_price }) => ( */}
        <div className="ordered-product-card">
          <img src={item?.img} alt="Ascend TechFit" />
          <span>
            <span>{item?.name} - </span>
            <span>1</span>
          </span>
          <span> ₹ {item?.original_price}</span>
        </div>
        {/* )
        )} */}
      </div>
    </div>
  );
};
