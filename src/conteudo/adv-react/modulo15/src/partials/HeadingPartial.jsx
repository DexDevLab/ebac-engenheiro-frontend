import { Box, Heading } from "../ds";

export default function HeadingPartial(props) {
  return (
    <Box
      dir="column"
      align={"center"}
      justify={"around"}
      wrap={"nowrap"}
      sx={"h25 w25 mr-auto ml-auto"}
    >
      <Heading />

      <Heading variant={"secondary"} />

      <Heading variant={"success"} />

      <Heading variant={"warning"} />

      <Heading variant={"error"} />

      <Heading sx={"f5 white bg-red"} />
    </Box>
  );
}
