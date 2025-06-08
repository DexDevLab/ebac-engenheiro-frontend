import { Box, Text, ThemeSwitch } from "../ds";

export default function ThemeSwitchPartial(props) {
  return (
    <Box
      dir="column"
      align={"start"}
      justify={"start"}
      wrap={"nowrap"}
      sx={"h4 w5 mt4"}
    >
      <Text
        style={{
          margin: "auto",
        }}
        variant={"xl"}
      >
        Theme Switch
      </Text>
      <Box
        size={"5"}
        dir="row"
        align={"center"}
        justify={"around"}
        wrap={"wrap"}
        sx={"mr-auto ml-auto"}
      >
        <ThemeSwitch
          id={"theme-sw-small"}
          size={"sm"}
          darkBg={"red"}
          lightBg={"yellow"}
          btnBg={"green"}
        />

        <ThemeSwitch id={"theme-sw-md"} />

        <ThemeSwitch
          id={"theme-sw-lg"}
          size={"lg"}
          darkBg={"purple"}
          lightBg={"light-pink"}
        />
      </Box>
    </Box>
  );
}
