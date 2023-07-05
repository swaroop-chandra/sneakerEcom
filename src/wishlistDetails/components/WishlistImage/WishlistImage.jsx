import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import "./WishlistImage.css";
import Tilt from "react-parallax-tilt";
import ReactImageMagnify from "react-image-magnify";
import { MdDelete } from "react-icons/md";

export const WishlistImage = ({ selectedProduct, setCheck, check }) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 772px)",
  });

  const [local, setLocal] = useState([]);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("wishlist"));
    setLocal(localData);
  }, []);

  const removeFromCartHandler = (id) => {
    const index = local.indexOf(id);
    console.log(index, "index");
    if (index > -1) {
      local.splice(index, 1);
      setLocal(local);
      localStorage.setItem("wishlist", JSON.stringify(local));
      setCheck(!check);
    }
  };

  return (
    <div
      style={{
        // padding: "12px",
        display: "flex",
        justifyContent: "center",
        aspectRatio: "16/9",
      }}
    >
      {isDesktopOrLaptop ? (
        <div>
          {/* <div className="secondary-btn-section"> */}
          <MdDelete
            size={25}
            onClick={() => removeFromCartHandler(selectedProduct?._id)}
          />
          {/* </div> */}
          <ReactImageMagnify
            smallImage={{
              alt: "Small Image",
              src: selectedProduct?.img,
              width: 410,
              height: 400,
            }}
            largeImage={{
              src: selectedProduct?.img,
              width: 700,
              height: 600,
            }}
            lensStyle={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
            enlargedImagePosition="over"
            isActivatedOnTouch={true}
            style={{
              zIndex: 99,
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      ) : (
        <Tilt
          tiltEnable={true}
          scale={1.05}
          transitionSpeed={1000}
          className="product-details-image"
        >
          <img src={selectedProduct?.img} alt="drip" />
        </Tilt>
      )}
    </div>
  );
};
