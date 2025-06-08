import React, { createContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import "../globals/styles.css";
import "animate.css";

const ThemeContext = createContext();

const getSystemTheme = () => {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  } else {
    return "light";
  }
};

const getTheme = () => {
  const theme = localStorage.getItem("theme");
  const dataTheme = document.querySelector("body").getAttribute("data-theme");
  const systemTheme = getSystemTheme();
  if (!theme) {
    if (!dataTheme) {
      document.querySelector("body").setAttribute("data-theme", systemTheme);
      localStorage.setItem("theme", systemTheme);
    } else {
      if (dataTheme === "toggle-light") {
        localStorage.setItem("theme", "light");
      } else if (dataTheme === "toggle-dark") {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", dataTheme);
      }
    }
  } else {
    localStorage.setItem("theme", theme);
    document.querySelector("body").setAttribute("data-theme", theme);
  }
 
  return localStorage.getItem("theme");
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getTheme);

  function toggleTheme() {
    if (theme === "dark" || theme === "toggle-dark") {
      document.querySelector("body").setAttribute("data-theme", "toggle-light");
      setTimeout(() => setTheme("light"), 200);
    } else {
      document.querySelector("body").setAttribute("data-theme", "toggle-dark");
      setTimeout(() => setTheme("dark"), 200);
    }
  }

  useEffect(() => {
    const refreshTheme = () => {
      document.querySelector("body").setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    };
    refreshTheme();
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      <Toaster />
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
