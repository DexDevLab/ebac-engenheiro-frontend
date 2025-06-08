import useStyle from "../globals/useStyle";

export default function Text({ children, variant, sx, style, ...props }) {
  const lorem = `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."`;
  const { classNameProps, styledProps } = useStyle(
    "txt",
    variant,
    false,
    sx,
    style
  );

  return (
    <h1 className={classNameProps} style={styledProps} {...props}>
      {children || lorem}
    </h1>
  );
}
