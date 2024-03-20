"use client";

import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeContextProvider(props) {
  // false = dark mode because of the way I wrote the CSS
  const [active, setActive] = useState(false);
  // the opposite, for screenreaders
  const [ariaActive, setAriaActive] = useState(true);
  const [systemState, setsystemState] = useState(true);

  function handleKeypress(e) {
    if (e.code === "Enter") {
      changeTheme();
    }
  }

  function changeTheme() {
    let dataTheme = document.querySelector(":root").getAttribute("data-theme");
    if (dataTheme === "dark-theme") {
      setLightTheme();
    } else if (dataTheme === "light-theme") {
      setDarkTheme();
    }
  }

  function setDarkTheme() {
    localStorage.setItem("theme", "dark-theme");
    setThemeDatails("dark-theme");
  }

  function setLightTheme() {
    localStorage.setItem("theme", "light-theme");
    setThemeDatails("light-theme");
  }

  function setSystemTheme() {
    let prefersLightTheme = window.matchMedia("(prefers-color-scheme: light)");
    localStorage.setItem("theme", "system-theme");
    if (prefersLightTheme.matches) {
      setThemeDatails("light-theme", true);
    } else {
      setThemeDatails("dark-theme", true);
    }

    prefersLightTheme.addEventListener("change", ({ matches }) => {
      if (matches) {
        setLightTheme();
      } else {
        setDarkTheme();
      }
    });
  }

  function setThemeDatails(theme, SystemTheme) {
    if (SystemTheme === undefined) {
      if (theme === "dark-theme") {
        setActive(false);
        setAriaActive(true);
        setsystemState(false);
        document
          .querySelector(":root")
          .setAttribute("data-theme", "dark-theme");
      } else if (theme === "light-theme") {
        setActive(true);
        setAriaActive(false);
        setsystemState(false);
        document
          .querySelector(":root")
          .setAttribute("data-theme", "light-theme");
      }
    } else if (SystemTheme === true) {
      if (theme === "dark-theme") {
        setActive(false);
        setAriaActive(true);
        setsystemState(true);
        document
          .querySelector(":root")
          .setAttribute("data-theme", "dark-theme");
      } else if (theme === "light-theme") {
        setActive(true);
        setAriaActive(false);
        setsystemState(true);
        document
          .querySelector(":root")
          .setAttribute("data-theme", "light-theme");
      }
    }
  }

  useEffect(() => {
    let theme = localStorage.getItem("theme");
    if (theme === "dark-theme") {
      setDarkTheme();
    } else if (theme === "light-theme") {
      setLightTheme();
    } else {
      setSystemTheme();
    }
  }, []);

  const context = {
    systemState,
    setDarkTheme,
    setLightTheme,
    setSystemTheme,
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
