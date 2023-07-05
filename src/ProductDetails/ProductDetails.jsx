// import "./ProductDetails.css";
// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { products } from "../backend/db/products";

// // import { useData } from "../../contexts/DataProvider";
// import ProductImage from "./components/ProductImage/ProductImage";
// import { ProductDescription } from "./components/ProductDescription/ProductDescription";

// export const ProductDetails = () => {
//   // const { state } = useData();
//   // const { productId } = useParams();
//   // const { loading } = useData();

//   // const selectedProduct = state.allProductsFromApi?.find(
//   //   ({ id }) => Number(id) === Number(productId)
//   // );

//   const { productId } = useParams();
//   const [item, setItem] = useState({});

//   useEffect(() => {
//     const data = products.find((id) => id._id == productId);
//     setItem(data);
//   }, []);

//   return (
//     // !loading && (
//     <>
//       <div className="products-page-container">
//         {/* <ProductImage selectedProduct={selectedProduct} />
//           <ProductDescription selectedProduct={selectedProduct} /> */}
//         <ProductImage item={item} />
//         <ProductDescription item={item} />
//       </div>
//     </>
//     // )
//   );
// };
import "./ProductDetails.css";
import React from "react";
import { useParams } from "react-router-dom";
import { useData } from "../contexts/DataProvider";
import { ProductImage } from "./components/ProductImage/ProductImage";
import { ProductDescription } from "./components/ProductDescription/ProductDescription";

export const ProductDetails = () => {
  const { state } = useData();
  const { productId } = useParams();
  const { loading } = useData();

  const selectedProduct = state.allProductsFromApi?.find(
    ({ id }) => Number(id) === Number(productId)
  );

  return (
    !loading && (
      <>
        <div className="products-page-container">
          <ProductImage selectedProduct={selectedProduct} />
          <ProductDescription selectedProduct={selectedProduct} />
        </div>
      </>
    )
  );
};
