import { useEffect, useState } from "react";
import "./Cart.css";

// import { CartListing } from "./components/CartListing/CartListing";
// import { Coupons } from "./components/Coupons/Coupons";
// import { CartAmountSummary } from "./components/CartAmountSummary/CartAmountSummary";
//import { useUserData } from "../../contexts/UserDataProvider";
// import { useNavigate } from "react-router-dom";
import { CartAmountSummary } from "./components/CartAmountSummary/CartAmountSummary";
import { CartListing } from "./components/CartListing/CartListing";
import { Link, useParams } from "react-router-dom";
import { products } from "../backend/db/products";
import { useData } from "../contexts/DataProvider";

export const Cart = () => {
  // const [couponSelected, setCouponSelected] = useState([]);
  // const { userDataState } = useUserData();
  // const navigate = useNavigate();
  const { loading } = useData();
  const [item, setItem] = useState([]);
  const [total, setTotal] = useState(0);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("cart_data"));
    console.log(products);
    const data = products.filter((id) => local.includes(id._id));
    setItem(data);

    const totalAmount = data.reduce(
      (sum, item) => sum + (item.original_price - 2480),
      0
    );
    setTotal(totalAmount);
  }, [check]);

  return (
    !loading && (
      // (userDataState.cartProducts.length ? (
      <div>
        <h1 className="page-heading" style={{ marginTop: 100 }}>
          Cart
        </h1>
        {item.map((it) => (
          <>
            <div className="cart-container">
              <CartListing item={it} setCheck={setCheck} check={check} />
              <div>
                {/* <Coupons
              couponSelected={couponSelected}
              setCouponSelected={setCouponSelected}
            /> */}
                {/* <CartAmountSummary couponSelected={couponSelected} /> */}
                <CartAmountSummary item={it} />
              </div>
            </div>
          </>
        ))}

        <div
          style={{
            fontWeight: 700,
            fontSize: "35px",
            color: "black",
            display: "flex",
            justifyContent: "between",
            width: "100%",
            height: "100px",
          }}
        >
          <div style={{ width: "50vw" }}></div>
          <div
            style={{ display: "flex", justifyContent: "start", width: "30vw" }}
          >
            {" "}
            <span className="total-container">Grand Total: </span>
            <span> ₹ {total}</span>
          </div>
          <div
            style={{
              padding: "2px 5px",
              width: "18%",
              background: "gray",
              borderRadius: "24px",
              fontSize: "18px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "25px",
              height: "30px",
            }}
          >
            <Link
              to="/checkout"
              style={{ textDecoration: "auto", color: "white" }}
            >
              Place Order
            </Link>
          </div>
        </div>
      </div>
    )
    // ) : (
    // <div className="no-items-container">
    //   <h2 className="page-heading">Cart is Empty!</h2>
    //   <button
    //     className="explore-btn"
    //     onClick={() => navigate("/product-listing")}
    //   >
    //     Explore
    //   </button>
    // </div>
    // ))
  );
};
