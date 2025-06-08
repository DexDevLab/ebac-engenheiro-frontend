import Box from "../../box/Box";
import Hyperlink from "../../hyperlink/Hyperlink";

export default function NavbarItem({ key, href, label, ...props }) {
  return (
    <Box key={key} dir={"row"} sx={"h3"}>
      <Hyperlink href={href} {...props}>
        {label}
      </Hyperlink>
    </Box>
  );
}
