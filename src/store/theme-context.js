"use client";

import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeContextProvider(props) {
  // false = dark mode because of the way I wrote the CSS
  const [active, setActive] = useState(false);
  // the opposite, for screenreaders
  const [ariaActive, setAriaActive] = useState(true);

  function handleKeypress(e) {
    if (e.code === "Enter") {
      changeTheme();
    }
  }

  function changeTheme() {
    if (localStorage.getItem("theme") === "theme-dark") {
      setLightTheme();
    } else {
      setDarkTheme();
    }
  }

  function setLightTheme() {
    localStorage.setItem("theme", "theme-light");
    setActive(true);
    setAriaActive(false);
    document.querySelector(":root").setAttribute("data-theme", "light");
  }

  function setDarkTheme() {
    localStorage.setItem("theme", "theme-dark");
    setActive(false);
    setAriaActive(true);
    document.querySelector(":root").setAttribute("data-theme", "dark");
  }

  useEffect(() => {
    let theme = localStorage.getItem("theme");
    if (theme === "theme-dark") {
      setDarkTheme();
    } else if (theme === "theme-light") {
      setLightTheme();
    } else {
      let prefersLightTheme = window.matchMedia(
        "(prefers-color-scheme: light)"
      );
      if (prefersLightTheme.matches) {
        setLightTheme();
      } else {
        setDarkTheme();
      }
    }
  }, []);

  const context = {
    active,
    ariaActive,
    changeTheme,
    handleKeypress,
  };

  return (
    <ThemeContext.Provider value={context}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
