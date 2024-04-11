import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import NavbarItem from "./NavbarItem";

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ backgroundColor: "#04799b", justifyContent: "center" }}>
        <NavbarItem href={"/"}>Home</NavbarItem>
        <NavbarItem href={"/formOne"}>Formulário 1</NavbarItem>
        <NavbarItem href={"/formTwo"}>Formulário 2</NavbarItem>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
