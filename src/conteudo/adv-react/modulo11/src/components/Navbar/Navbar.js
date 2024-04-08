import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import NavbarItem from "./NavbarItem";

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ backgroundColor: "#04799b", justifyContent: "center" }}>
        <NavbarItem href={"/"}>Home</NavbarItem>
        <NavbarItem href={"/form"}>Cadastro</NavbarItem>
        <NavbarItem href={"/listagem"}>Listagem</NavbarItem>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
