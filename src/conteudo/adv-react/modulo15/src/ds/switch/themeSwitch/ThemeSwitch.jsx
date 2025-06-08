import { useContext, useEffect, useState } from "react";
import { TbMoonFilled, TbSunFilled } from "react-icons/tb";
import { ThemeContext } from "../../globals/Theme";
import Switch from "../Switch";

export default function ThemeSwitch({
  id,
  size = "md",
  darkBg = "secondary",
  lightBg = "primary",
  btnBg = "white",
  overlay,
  ...props
}) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [isDark, setDark] = useState(theme === "dark");

  useEffect(() => {
    setDark(theme === "dark");
  }, [theme]);

  return (
    <Switch
      id={id}
      size={size}
      offBg={darkBg}
      OnBg={lightBg}
      btnBg={btnBg}
      setSwitch={toggleTheme}
      switchOn={!isDark}
      leftIcon={<TbSunFilled color="orange" />}
      rightIcon={<TbMoonFilled color="#333" />}
      overlay={overlay}
    />
  );
}
