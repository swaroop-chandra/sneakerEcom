import "./WishlistDetails.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../contexts/DataProvider";
import { WishlistDescription } from "./components/WishlistDescription/WishlistDescription";
import { WishlistImage } from "./components/WishlistImage/WishlistImage";
import { products } from "../backend/db/products";

export const WishlistDetails = () => {
  const { state } = useData();
  const { productId } = useParams();
  const { loading } = useData();

  const selectedProduct = state.allProductsFromApi?.find(
    ({ id }) => Number(id) === Number(productId)
  );

  const [item, setItem] = useState([]);
  const [total, setTotal] = useState(0);
  const [check, setCheck] = useState(false);
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("wishlist"));
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
      <>
        {item?.map((it) => (
          <>
            <div className="products-page-container">
              <WishlistImage
                selectedProduct={it}
                check={check}
                setCheck={setCheck}
              />
              <WishlistDescription selectedProduct={it} />
            </div>
          </>
        ))}
      </>
    )
  );
};
