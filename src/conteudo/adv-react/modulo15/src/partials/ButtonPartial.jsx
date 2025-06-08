import { Box, Button } from "../ds";

export default function ButtonPartial(props) {
  return (
    <Box
      dir="row"
      align={"center"}
      justify={"around"}
      wrap={"wrap"}
      sx={"w-50 h4 mr-auto ml-auto"}
    >
      <Button />
      <Button variant={"secondary"} />
      <Button variant={"success"} />
      <Button variant={"warning"} />
      <Button variant={"error"} />
      <Button sx={"bg-pink blue"} />
    </Box>
  );
}
