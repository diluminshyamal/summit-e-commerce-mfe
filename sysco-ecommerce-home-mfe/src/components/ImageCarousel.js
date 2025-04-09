import React from "react";
import { Carousel } from "antd";

const ImageCarousel = ({ images }) => {
  const carouselSettings = {
    autoplay: true,
    dots: true,
    arrows: false,
  };

  return (
    <Carousel
      {...carouselSettings}
      style={{ marginTop: "20px", height: "400px", overflow: "hidden" }}
    >
      {images.map((image, index) => (
        <div
          key={index}
          style={{
            height: "400px",
            width: "100%", // ensure container width is 100%
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={image}
            alt={`Banner ${index + 1}`}
            style={{
              width: "100%", // ensure image width is 100%
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
