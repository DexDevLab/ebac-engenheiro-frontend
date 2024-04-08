import { Box } from "@mui/material";
import React from "react";
import Slider from "react-slick";

function SliderComponent({
  h = { mobile: "12rem", tablet: "25rem", laptop: "25rem", desktop: "25rem" },
  w = { mobile: "80%", tablet: "80%", laptop: "80%", desktop: "40%" },
  carouselItems = [],
  ...props
}) {
  const CarouselItemComponent = (item, index) => {
    return (
      <Box
        key={`carouselItem-${index}`}
        sx={{
          width: w,
          height: h,
          borderRadius: 1,
        }}
      >
        {item}
      </Box>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnDotsHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Box
      sx={{
        width: w,
        height: h,
        justifyContent: "center",
        marginX: "auto",
      }}
    >
      <div className="slider-container">
        <Slider {...settings}>
          {Array.from(carouselItems).map((item, index) => {
            return CarouselItemComponent(item, index);
          })}
        </Slider>
      </div>
    </Box>
  );
}

export default SliderComponent;
