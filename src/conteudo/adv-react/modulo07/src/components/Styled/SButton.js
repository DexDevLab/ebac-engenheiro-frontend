import { Button } from "@mui/material";
import styled from "styled-components";

export default styled(Button)`
  background-color: ${(props) =>
    props.activekey === "true" ? "#61dafb" : props.color};
`;
