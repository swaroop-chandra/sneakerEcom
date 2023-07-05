import React from "react";
import { useMediaQuery } from "react-responsive";
import "./ProductImage.css";
import Tilt from "react-parallax-tilt";

export const ProductImage = ({ selectedProduct }) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 992px)",
  });

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
          {/* <ReactImageMagnify
            smallImage={{
              alt: "Small Image",
              src: selectedProduct?.img,
              width: 610,
              height: 600,
            }}
            largeImage={{
              src: selectedProduct?.img,
              width: 1200,
              height: 900,
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
          /> */}
          <Tilt
            tiltEnable={true}
            scale={1.05}
            transitionSpeed={1000}
            className="product-details-image"
          >
            <img src={selectedProduct?.img} alt="drip" />
          </Tilt>
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
