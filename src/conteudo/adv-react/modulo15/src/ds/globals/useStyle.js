import _ from "lodash";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./Theme";

const useStyle = (
  component = "",
  variant = "primary",
  fillWithVariant = false,
  sx = "",
  styledProps = {}
) => {
  const { theme } = useContext(ThemeContext);
  const [themeProp, setThemeProp] = useState("");

  useEffect(() => {
    if (theme === "dark") {
      setThemeProp("-dark");
    } else {
      setThemeProp("");
    }
  }, [theme]);

  const sxHasSizeDefined = (sx) => {
    let value = false;
    const sizes = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "-25",
      "-50",
      "-75",
      "-100",
      "auto",
      "-ns",
      "-m",
      "-l",
    ];
    sizes.forEach((item) => {
      if (sx.includes("h" + item) || sx.includes("w" + item)) {
        value = true;
      }
    });
    return value;
  };

  const getPropsByVariantAsObj = () => {
    switch (component) {
      case "box":
        for (const [key, value] of Object.entries(variant)) {
          switch (key) {
            case "dir":
            case "wrap":
              classNameString += `flex-${value} `;
              break;
            case "align":
              classNameString += ` items-${value}`;
              break;
            case "justify":
              classNameString += ` justify-${value} `;
              break;
            default:
              break;
          }
        }
        break;
      case "switch":
        for (const [key, value] of Object.entries(variant)) {
          if (key !== "size") {
            if (!_.isUndefined(value)) {
              Object.assign(styledProps, { [key]: value });
            }
          }
        }
        break;
      default:
        break;
    }
    switch (variant.size) {
      case "xs":
      case "sm":
      case "md":
      case "lg":
      case "xl":
        classNameString += ` ${component}-${variant.size}${themeProp} `;
        break;
      case undefined:
        if (!sxHasSizeDefined(sx)) {
          classNameString += ` ${component}-md${themeProp} `;
        }
        break;
      default:
        classNameString += ` h${variant.size} w${variant.size} `;
        break;
    }
  };

  const getPropsByVariantAsStr = () => {
    switch (variant) {
      case "primary":
      case "secondary":
      case "success":
      case "warning":
      case "error":
      case "xs":
      case "sm":
      case "md":
      case "lg":
      case "xl":
        classNameString += `${component}-${variant}${themeProp} `;
        classNameString += `${component}-bg-${variant} `;
        classNameString += `${component}-bcolor-${variant}`;
        break;
      default:
        if (fillWithVariant) {
          classNameString += `bg-${variant} `;
          classNameString += `${component} `;
        } else {
          classNameString += `${variant} `;
        }
        break;
    }
  };

  let classNameString = "";

  if (typeof variant === "object") {
    getPropsByVariantAsObj();
    classNameString += `${sx}`;
  } else {
    if (sx === "") {
      getPropsByVariantAsStr();
    } else {
      classNameString += `${component}-primary${themeProp} ${sx}`;
    }
  }

  const classNameProps = classNameString.toString().replaceAll("  ", " ");

  return { classNameProps, styledProps };
};
export default useStyle;
