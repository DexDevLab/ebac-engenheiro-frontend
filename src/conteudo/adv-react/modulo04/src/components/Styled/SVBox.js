import { Box } from "@mui/material";
import styled from "styled-components";

export default styled(Box)`
  height: calc(${(props) => props.h * 50 || 1 * 100}px + 3vmin);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
