import styled, { createGlobalStyle, keyframes } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #282c34;
  }
`;

const SColor = (colorProp) => {
  switch (colorProp) {
    case "normal":
      return "green";
    case "warning":
      return "coral";
    case "danger":
      return "red";
    default:
      return "white";
  }
};

export const SHeader = styled.header`
  min-height: 15vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1px;
  font-size: calc(10px + 2vmin);
  color: white;
`;

export const SP1 = styled.p`
  margin: calc(1px + 1vmin);
  color: ${(props) => SColor(props.color)};
`;

export const SButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  border: solid black 1px;
  border-radius: 5px;
  width: fit-content;
  height: calc(25px + 1vmin);
  margin: 0;
  padding: 15px;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */

  :hover {
    background-color: #61dafb;
    color: black;
    border: solid black 1px;
    transition: 0.6s;
  }

  p {
    text-align: center;
    line-height: calc(2px + 2vmin);
    margin: 0;
    font-size: calc(2px + 2vmin);
  }
`;

export const SLoginInputGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  padding: 25px;
  gap: 10px;

  label {
    font-size: calc(1px + 2vmin);
  }

  input {
    font-size: calc(1px + 2vmin);
    width: calc(75px + 2vmin);
    text-align: center;
  }

  input[name="peso"] {
    width: calc(45px + 2vmin);
  }

  input:checked + label > div {
    background-color: #61dafb;
    color: black;
    border: solid black 1px;
    transform: scale(0.98);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
`;

const SKeyframe = (keyframeName) => {
  switch (keyframeName) {
    case "AppLogoSpin":
      return keyframes`
             from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
            `;
    default:
      break;
  }
};

export const SLogo = styled.img`
  height: 20vmin;
  pointer-events: none;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${SKeyframe("AppLogoSpin")} infinite 10s linear;
  }
`;

export const SH1 = styled.h1`
  margin: calc(1px + 1vmin);
`;

export const SH2 = styled.h2`
  margin: calc(0.5px + 1vmin);
`;
