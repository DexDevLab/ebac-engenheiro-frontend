import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import Login from "./components/Login/LoginReactFunction";
import { GlobalStyle } from "./components/Styled/Style";
import reportWebVitals from "./reportWebVitals";
import IMCCalculator from "./components/IMCCalculator";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.Fragment>
    <CssBaseline />
    <GlobalStyle />
    <Login>
      <App />
      <IMCCalculator />
    </Login>
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
