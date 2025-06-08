import { Box } from "../ds";

export default function BoxPartial(props) {
  return (
    <Box
      dir="row"
      align={"center"}
      justify={"around"}
      wrap={"wrap"}
      sx={"h-100 w-100"}
    >

      <Box size={"xs"} sx={"ma1 bg-blue"}>
        xs
      </Box>
      <Box
        dir="column"
        align={"center"}
        justify={"center"}
        wrap={"wrap"}
        size={"sm"}
        sx={"mh1 bg-red"}
      >
        sm
      </Box>
      <Box sx={"ma1 bg-light-purple"}>md</Box>
      <Box size={"lg"} sx={"ma1 bg-orange"}>
        lg
      </Box>
      <Box size={"xl"} sx={"ma1 bg-dark-green"}>
        xl
      </Box>

    </Box>
  );
}
