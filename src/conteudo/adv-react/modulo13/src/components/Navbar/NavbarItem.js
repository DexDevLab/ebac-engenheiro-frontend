import Typography from "@mui/material/Typography";
import React from "react";

function NavbarItem({ linkColor = "white", href, children, ...props }) {
  return (
    <Typography
      variant="h6"
      noWrap
      component="a"
      href={href}
      sx={{
        mr: 2,
        fontWeight: "bold",
        fontFamily: "Helvetica",
        color: linkColor,
        letterSpacing: ".2rem",
        textDecoration: "none",
        paddingX: "1rem",
        fontSize: {
          mobile: "0.6rem",
          tablet: "1rem",
          laptop: "1.5rem",
          desktop: "1.5rem",
        },
      }}
    >
      {children}
    </Typography>
  );
}

export default NavbarItem;
