import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SVBox from "./components/Styled/SVBox";
import { GlobalStyle, SH1, SH2 } from "./components/Styled/Style";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.Fragment>
    <CssBaseline />
    <GlobalStyle />
    <SVBox pt={4} h={5}>
      <SH1>EBAC - Profissão: Engenheiro Frontend - React do Zero ao Pro</SH1>
      <SH2>Módulo 10 - Exercício - API</SH2>
    </SVBox>
    <App />
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
