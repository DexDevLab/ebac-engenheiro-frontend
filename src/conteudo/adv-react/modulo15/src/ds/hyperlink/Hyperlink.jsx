import { useContext } from "react";
import { ThemeContext } from "../globals/Theme";
import Text from "../text/Text";

export default function Hyperlink({
  href = "https://react.dev",
  children,
  sx,
  style,
  ...props
}) {
  const { theme } = useContext(ThemeContext);

  return (
    <a className={"hyperlink-a"} href={href} target="_blank" rel="noreferrer">
      <Text
        sx={`txt-primary${theme === "dark" ? "-dark" : ""} ${sx}`}
        style={{
          margin: "auto",
          ...style,
        }}
        {...props}
      >
        {children}
      </Text>
    </a>
  );
}
