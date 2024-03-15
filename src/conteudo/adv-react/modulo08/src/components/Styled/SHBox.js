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

const SFlex = (isFlex) =>{
  if(isFlex){
    return "flex";
  }
  else{
    return "block";
  }
};



const SHeight = (h) => {
  return h ? `calc(${h}*50px + 3vmin);` : "fit-content";
};

export default styled(Box)`
  background-color: ${(props) => props.bgColor};
  display: ${(props) => SFlex(props.$isFlex)};
  flex-direction: row;
  justify-content: ${(props) => SFlexPosition(props.justify)};
  width: calc(${(props) => props.w * 50}px + 3vmin);
  height: ${(props) => SHeight(props.h)};
  margin-left: auto;
  margin-right: auto;
`;
