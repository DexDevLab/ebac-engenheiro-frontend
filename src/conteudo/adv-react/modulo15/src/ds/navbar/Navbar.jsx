import { useContext, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import AnimationWrapper from "../animations/AnimationWrapper";
import useAnimations from "../animations/useAnimations";
import Box from "../box/Box";
import { ThemeContext } from "../globals/Theme";
import useCustomBreakpoint from "../globals/useCustomBreakpoint";
import ImageComponent from "../imageComponent/ImageComponent";
import ThemeSwitch from "../switch/themeSwitch/ThemeSwitch";
import NavbarItem from "./navbarItem/NavbarItem";

export default function Navbar({
  lightBg = "secondary",
  darkBg = "primary",
  lightColor = "white",
  darkColor = "black",
  showThemeSwitch = true,
  brandLogo,
  brandName = "Brand",
  itemList = [
    {
      label: "Menu",
      link: undefined,
    },
  ],
  options,
  ...props
}) {
  const { theme } = useContext(ThemeContext);
  const { isOpen, animate, close, toggle } = useAnimations();
  const { breakpointGTE } = useCustomBreakpoint("lg");
  const [bg, setBg] = useState(theme === "light" ? lightBg : darkBg);
  const [color, setColor] = useState(
    theme === "light" ? lightColor : darkColor
  );

  const openMobileMenu = () => {
    toggle();
  };

  useEffect(() => {
    setBg(theme === "light" ? lightBg : darkBg);
    setColor(theme === "light" ? lightColor : darkColor);
    if (breakpointGTE && isOpen) {
      close();
    }
  }, [
    breakpointGTE,
    close,
    darkBg,
    darkColor,
    isOpen,
    lightBg,
    lightColor,
    theme,
  ]);

  const MobileMenu = () => {
    return (
      <>
        <Box
          dir={"column"}
          justify={"between"}
          sx={`bg-${bg} w-100 pt1 pb2 ${color}`}
          style={{
            height: "fit-content",
          }}
        >
          {Array.from(itemList).map((item, key) => {
            return (
              <NavbarItem
                href={item.link}
                key={key + "-" + item.label}
                style={{
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                }}
                label={item.label}
              />
            );
          })}
        </Box>
        {options && (
          <Box
            dir={"column"}
            justify={"between"}
            sx={`bg-${bg} w-100 pt1 pb3 ${color}`}
            style={{
              height: "fit-content",
            }}
          >
            {options}
          </Box>
        )}
      </>
    );
  };

  return (
    <>
      <nav className="navbar">
        {breakpointGTE ? (
          <Box
            dir={"row"}
            justify={"between"}
            sx={`bg-${bg} w-100 h3 ${color}`}
          >
            <Box
              dir={"row"}
              justify={"start"}
              gap={1}
              size={"sm"}
              sx={"w-25 h3"}
            >
              <Box dir={"row"} sx={"h-75"}>
                {brandLogo || (
                  <ImageComponent type={"img"} variant={"sm"} sx={"h-75"} />
                )}
              </Box>
              <Box dir={"row"} sx={"h3"}>
                {brandName}
              </Box>
            </Box>
            <Box
              dir={"row"}
              justify={"center"}
              gap={2}
              size={"sm"}
              sx={"w-50 h3"}
            >
              {Array.from(itemList).map((item, key) => {
                return (
                  <NavbarItem
                    href={item.link}
                    key={key + "-" + item.label}
                    //sx={"f5"}
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.25rem",
                    }}
                    label={item.label}
                  />
                );
              })}
            </Box>
            <Box dir={"row"} justify={"end"} gap={1} size={"sm"} sx={"w-25 h3"}>
              <Box dir={"row"} sx={"h3"}>
                {options}
              </Box>
              {showThemeSwitch && (
                <Box
                  dir={"row"}
                  sx={"h3 mr1"}
                  style={{
                    zIndex: 9998,
                  }}
                >
                  <ThemeSwitch size="sm" overlay />
                </Box>
              )}
            </Box>
          </Box>
        ) : (
          <Box
            dir={"row"}
            justify={"between"}
            sx={`bg-${bg} w-100 h3 ${color}`}
          >
            <Box
              dir={"row"}
              justify={"start"}
              gap={5}
              size={"sm"}
              sx={"w3 h3 w-25"}
              onClick={() => openMobileMenu()}
              style={{
                cursor: "pointer",
              }}
            >
              <GiHamburgerMenu size={30} />
            </Box>
            <Box
              dir={"row"}
              justify={"center"}
              gap={3}
              size={"sm"}
              sx={"w-50 h3"}
            >
              <Box dir={"row"} sx={"h-75"}>
                {brandLogo || (
                  <ImageComponent type={"img"} variant={"sm"} sx={"h-75"} />
                )}
              </Box>
              <Box dir={"row"} sx={"h3"}>
                {brandName}
              </Box>
            </Box>

            <Box dir={"row"} align={"end"} justify={"end"} sx={"w-25 h1 pr3"}>
              {showThemeSwitch && <ThemeSwitch size="sm" overlay />}
            </Box>
          </Box>
        )}

        <AnimationWrapper id={"mobileMenu"} isOpen={isOpen} animate={animate}>
          {MobileMenu()}
        </AnimationWrapper>
      </nav>
    </>
  );
}
