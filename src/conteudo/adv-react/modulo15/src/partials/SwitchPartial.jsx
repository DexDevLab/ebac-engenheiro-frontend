import { useState } from "react";
import { Box, Switch, Text } from "../ds";

export default function SwitchPartial(props) {
  const [isOn, setSwitch] = useState(false);
  return (
    <Box
      dir="column"
      align={"start"}
      justify={"start"}
      wrap={"nowrap"}
      sx={"h4 w5"}
    >
      <Text
        style={{
          margin: "auto",
        }}
        variant={"xl"}
      >
        Switch
      </Text>
      <Box
        size={"5"}
        dir="row"
        align={"center"}
        justify={"around"}
        wrap={"wrap"}
        sx={"mr-auto ml-auto"}
      >
        <Switch
          id={"switch-sm"}
          size={"sm"}
          offBg={"red"}
          OnBg={"yellow"}
          btnBg={"green"}
          setSwitch={setSwitch}
          switchOn={isOn}
        />

        <Switch id={"switch-md"} setSwitch={setSwitch} switchOn={isOn} />

        <Switch
          id={"switch-lg"}
          size={"lg"}
          offBg={"purple"}
          OnBg={"light-pink"}
          setSwitch={setSwitch}
          switchOn={isOn}
        />
      </Box>
    </Box>
  );
}
