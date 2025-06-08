import React from "react";
import useStyle from "../globals/useStyle";

export default function Box({
  children = <></>,
  sx,
  style,
  gap = 0,
  overflowHidden = false,
  dir = "column",
  wrap = "wrap",
  align = "center",
  justify = "center",
  size,
  ...props
}) {
  const { classNameProps, styledProps } = useStyle(
    "box",
    { dir, wrap, align, justify, size },
    true,
    sx,
    style
  );

  const getChildStyles = () => {
    if (gap > 0) {
      if (dir === "column") {
        return {
          paddingTop: `${gap * 0.5}vh`,
          paddingBottom: `${gap * 0.5}vh`,
        };
      } else {
        return {
          paddingLeft: `${gap * 0.5}vw`,
          paddingRight: `${gap * 0.5}vw`,
        };
      }
    }
  };

  const childrenArr = Array.from(children);

  return (
    <div
      className={`flex ${classNameProps} `}
      style={{
        ...styledProps,
        overflowX: overflowHidden && "hidden",
      }}
      {...props}
    >
      {children &&
        (childrenArr.length > 0
          ? childrenArr.map((child, idx) => {
              if (typeof child !== "string" && typeof child !== "number") {
                return (
                  React.isValidElement(child) &&
                  React.cloneElement(child, {
                    key: idx,
                    style: { ...child.props?.style, ...getChildStyles() },
                  })
                );
              } else {
                return child;
              }
            })
          : React.isValidElement(children) &&
            React.cloneElement(children, {
              style: { ...children.props?.style, ...getChildStyles() },
            }))}
    </div>
  );
}
