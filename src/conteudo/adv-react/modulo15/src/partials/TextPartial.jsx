import { Box, Text, useCustomBreakpoint } from "../ds";

export default function TextPartial(props) {
  const { current, breakpointGTE } = useCustomBreakpoint("md");
  return (
    <Box
      dir={!breakpointGTE || current === "md" ? "column" : "row"}
      align={"center"}
      justify={"around"}
      wrap={!breakpointGTE || current === "md" ? "wrap" : "nowrap"}
      sx={
        !breakpointGTE || current === "md"
          ? "w-50 h-auto mr-auto ml-auto mt3"
          : "w-100 h-auto mr-auto ml-auto"
      }
      overflowHidden
      gap={!breakpointGTE || current === "md" ? 1 : 3}
    >
      <Text />
      <Text variant={"secondary"} />
      <Text variant={"success"} />
      <Text variant={"warning"} />
      <Text variant={"error"} />
      <Text variant={"sm"} />
      <Text variant={"md"} />
      <Text variant={"lg"} />
      <Text
        variant={"lg"}
        style={{
          fontWeight: "bold",
        }}
      />
      <Text sx={"f4 b green"} />
    </Box>
  );
}
