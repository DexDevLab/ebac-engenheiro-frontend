import { Box } from "@mui/material";
import styled from "styled-components";

const SFlexPosition = (pos) => {
  switch (pos) {
    case "start":
      return "flex-start";
    default:
      return "center";
  }
};

export default styled(Box)`
  height: calc(${(props) => props.h * 50 || 1 * 100}px + 3vmin);
  width: calc(${(props) => props.w * 50}px + 3vmin);
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => SFlexPosition(props.justify)};
  align-items: ${(props) => SFlexPosition(props.justify)};
  margin-left: auto;
  margin-right: auto;
  @media (min-width: 768px) {
    height: calc(${(props) => props.h * 48.4 || 1 * 100}px + 3vmin);
  }
`;
