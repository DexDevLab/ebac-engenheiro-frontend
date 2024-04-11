import { Box } from "@mui/material";
import NavbarItem from "./components/Navbar/NavbarItem";
import { SH2 } from "./components/Styled/Style";

function App() {
  return (
    <Box
      sx={{
        display: ["box", "flex"],
        flexDirection: "column",
        flexWrap: "wrap",
        maxWidth: ["100%", "100%", "80%", "50%"],
        marginX: "auto",
        marginY: "5rem",
      }}
    >
      <SH2>Selecione um formulário abaixo</SH2>
      <Box
        sx={{
          display: ["box", "flex"],
          flexDirection: "row",
          flexWrap: "wrap",
          maxWidth: ["100%", "100%", "80%", "50%"],
          marginX: "auto",
          marginY: "2rem",
        }}
      >
        <NavbarItem linkColor={"black"} href={"/formOne"}>
          Formulário 1
        </NavbarItem>
        <NavbarItem linkColor={"black"} href={"/formTwo"}>
          Formulário 2
        </NavbarItem>
      </Box>
    </Box>
  );
}

export default App;
