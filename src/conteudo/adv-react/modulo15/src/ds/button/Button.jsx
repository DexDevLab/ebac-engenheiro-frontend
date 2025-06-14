import useStyle from "../globals/useStyle";

export default function Button({
  children = "Button",
  variant,
  sx,
  style,
  ...props
}) {
  const { classNameProps, styledProps } = useStyle(
    "btn",
    variant,
    true,
    sx,
    style
  );

  return (
    <button
      className={classNameProps}
      style={{ cursor: "pointer", ...styledProps }}
      {...props}
    >
      {children}
    </button>
  );
}
