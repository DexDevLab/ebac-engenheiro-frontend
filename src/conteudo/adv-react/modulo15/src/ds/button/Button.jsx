import getStyledProps from "../globals/getStyledProps";

export default function Button({ children, variant = 'primary', sx, ...props }) {
  const internalProps = {
    color: `btn-color-${variant}`,
    bgColor: `btn-bg-${variant}`,
    bColor: `btn-bcolor-${variant}`,
  };
  console.log(getStyledProps(internalProps))

  return <button className={`${getStyledProps(internalProps)} b-- bw3 br2 pv1 ph2 ...${sx}`} {...props}>{children}</button>;
}
