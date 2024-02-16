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
    let theme = localStorage.getItem("theme");
    if (theme === "theme-dark") {
      setTheme("theme-light");
    } else if (theme === "theme-light") {
      setTheme("theme-dark");
    }
  }

  function setTheme(theme) {
    if (theme !== "theme-system") {
      localStorage.setItem("theme", theme);
      theme === "theme-dark" ? setActive(false) : setActive(true);
      theme === "theme-dark" ? setAriaActive(true) : setAriaActive(false);
      document.querySelector(":root").setAttribute("data-theme", theme);
    } else {
      let prefersLightTheme = window.matchMedia(
        "(prefers-color-scheme: light)"
      );
      if (prefersLightTheme.matches) {
        setTheme("theme-light");
      } else {
        setTheme("theme-dark");
      }
    }
  }

  useEffect(() => {
    let theme = localStorage.getItem("theme");
    if (theme === "theme-dark") {
      setTheme("theme-dark");
    } else if (theme === "theme-light") {
      setTheme("theme-light");
    } else {
      setTheme("theme-system");
    }
  }, []);

  const context = {
    setTheme,
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
