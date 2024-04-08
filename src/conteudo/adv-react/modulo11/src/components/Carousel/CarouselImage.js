import { Box } from "@mui/material";
import React from "react";

function CarouselImage({ w = "100%", h = "100%", alt, src, ...props }) {
  return (
    <Box
      component="img"
      sx={{
        height: h,
        width: w,
        marginX: "auto",
        borderRadius: 1,
        ...props,
      }}
      alt={alt}
      src={src}
    />
  );
}

export default CarouselImage;
