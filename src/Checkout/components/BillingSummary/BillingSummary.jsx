import React from "react";
import "./BillingSummary.css";
//import { useUserData } from "../../../../contexts/UserDataProvider";

export const BillingSummary = ({ total }) => {
  // const { userDataState } = useUserData();

  return (
    <div className="billing-container">
      <div className="price-details-container">
        <div>
          <span className="subtotal">Subtotal</span>
          <span>₹7920</span>
        </div>

        <div>
          <span className="subtotal">Discount</span>
          <span>₹ 2480</span>
        </div>

        <div>
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div>
          <span>Total</span>
          <span>₹ {total}</span>
        </div>
      </div>
    </div>
  );
};
