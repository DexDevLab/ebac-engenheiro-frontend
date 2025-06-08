import { useContext } from "react";
import { Box, Button, ThemeContext } from "../ds";

export default function ToggleThemeButtonPartial(props) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <Box
      dir="row"
      align={"center"}
      justify={"around"}
      wrap={"wrap"}
      sx={"mt4 mb4 h2 w4.5 mr-auto ml-auto"}
    >
      <Button onClick={() => toggleTheme()}>Disable {theme} mode</Button>
    </Box>
  );
}
