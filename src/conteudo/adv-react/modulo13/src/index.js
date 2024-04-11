import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import App from "./App";
import "./assets/styles/index.css";
import Layout from "./components/Layout";
import { GlobalStyle } from "./components/Styled/Style";
import FormOne from "./pages/FormOne";
import FormTwo from "./pages/FormTwo";
import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/formOne",
    element: <FormOne />,
  },
  {
    path: "/formTwo",
    element: <FormTwo />,
  },
]);

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <CssBaseline />
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      {/* <Navbar position="static" /> */}
      <Layout />
      <RouterProvider router={router} />
    </ThemeProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
