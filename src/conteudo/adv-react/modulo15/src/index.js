import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AnimationWrapper, ThemeProvider } from "./ds";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeProvider>
    <AnimationWrapper id={"appWrap"} isOpen={true} animate={true}>
      <App />
    </AnimationWrapper>
  </ThemeProvider>
);
