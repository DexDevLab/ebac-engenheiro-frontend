import React from "react";
import useStyle from "../globals/useStyle";

export default function Switch({
  id,
  size = "md",
  offBg = "secondary",
  onBg = "primary",
  btnBg = "white",
  switchOn,
  setSwitch,
  leftIcon,
  rightIcon,
  overlay = false,
  ...props
}) {
  const { classNameProps, styledProps } = useStyle(
    "switch",
    { size, offBg, onBg, btnBg },
    true
  );
  const className = classNameProps.replace("-dark", "").trimStart();

  const getPosition = () => {
    switch (size) {
      case "sm":
        return switchOn
          ? { top: "2px", left: "4px" }
          : { top: "2px", left: "19px" };
      case "lg":
        return switchOn
          ? { top: "5px", left: "4px" }
          : { top: "5px", left: "35px" };
      default:
        return switchOn
          ? { top: "4px", left: "4px" }
          : { top: "5px", left: "24px" };
    }
  };

  const getIconSize = () => {
    switch (size) {
      case "sm":
        return "12";
      case "lg":
        return "20";
      default:
        return "";
    }
  };

  const toggleSwitch = () => {
    setSwitch(!switchOn);
  };

  return (
    <div
      style={{
        position: "relative",
        height: "fit-content",
      }}
    >
      <div
        className={`switch-icon ${overlay ? "overlay" : ""}`}
        style={{
          ...getPosition(),
          cursor: switchOn && "pointer",
        }}
        onClick={() => toggleSwitch()}
      >
        {switchOn &&
          leftIcon &&
          React.cloneElement(leftIcon, {
            size: getIconSize(),
          })}
      </div>
      <div>
        <div className={`${className}`}>
          <input
            checked={!switchOn}
            className="switch-input"
            type="checkbox"
            id={id}
            onChange={() => {}}
          />
          <label
            aria-hidden="false"
            className={
              !switchOn
                ? `switch-label bg-${styledProps.offBg}`
                : `switch-label bg-${styledProps.onBg}`
            }
            htmlFor={id}
          />
          <div
            className={`switch-marker bg-${styledProps.btnBg}`}
            aria-hidden="true"
            onClick={() => toggleSwitch()}
            style={{
              cursor: "pointer",
            }}
          ></div>
        </div>
      </div>

      <div
        className={`switch-icon ${overlay ? "overlay" : ""}`}
        style={{
          ...getPosition(),
          cursor: !switchOn && "pointer",
        }}
        onClick={() => toggleSwitch()}
      >
        {!switchOn &&
          rightIcon &&
          React.cloneElement(rightIcon, {
            size: getIconSize(),
          })}
      </div>
    </div>
  );
}
