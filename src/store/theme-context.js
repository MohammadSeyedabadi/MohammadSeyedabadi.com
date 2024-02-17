"use client";

import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeContextProvider(props) {
  // false = dark mode because of the way I wrote the CSS
  const [active, setActive] = useState(false);
  // the opposite, for screenreaders
  const [ariaActive, setAriaActive] = useState(true);

  const [localStorageTheme, setlocalStorageTheme] = useState(null);

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
    setlocalStorageTheme("dark-theme");
    setThemeDatails("dark-theme");
  }

  function setLightTheme() {
    localStorage.setItem("theme", "light-theme");
    setlocalStorageTheme("light-theme");
    setThemeDatails("light-theme");
  }

  function setSystemTheme() {
    let prefersLightTheme = window.matchMedia("(prefers-color-scheme: light)");
    setlocalStorageTheme("system-theme");
    if (prefersLightTheme.matches) {
      localStorage.setItem("theme", "system-theme");
      setThemeDatails("light-theme");
    } else {
      localStorage.setItem("theme", "system-theme");
      setThemeDatails("dark-theme");
    }
  }

  function setThemeDatails(theme) {
    if (theme === "dark-theme") {
      setActive(false);
      setAriaActive(true);
      document.querySelector(":root").setAttribute("data-theme", "dark-theme");
    } else if (theme === "light-theme") {
      setActive(true);
      setAriaActive(false);
      document.querySelector(":root").setAttribute("data-theme", "light-theme");
    }
  }

  useEffect(() => {
    setlocalStorageTheme(localStorage.getItem("theme"));
    if (localStorageTheme === "dark-theme") {
      setDarkTheme();
    } else if (localStorageTheme === "light-theme") {
      setLightTheme();
    } else {
      setSystemTheme();
      setlocalStorageTheme("system-theme");
    }
  }, []);

  const context = {
    localStorageTheme,
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
