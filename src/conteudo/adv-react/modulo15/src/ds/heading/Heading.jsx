import useStyle from "../globals/useStyle";

export default function Heading({
  children = "Heading",
  variant,
  sx,
  style,
  ...props
}) {
  const { classNameProps, styledProps } = useStyle(
    "h",
    variant,
    false,
    sx,
    style
  );

  return (
    <h1 className={classNameProps} style={styledProps} {...props}>
      {children}
    </h1>
  );
}
