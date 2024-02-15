"use client";

import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeContextProvider(props) {
  // false = dark mode because of the way I wrote the CSS
  const [active, setActive] = useState(false);
  // the opposite, for screenreaders
  const [ariaActive, setAriaActive] = useState(true);

  

  function changeThemeAndToggle() {
    if (localStorage.getItem("theme") === "theme-dark") {
      localStorage.setItem("theme", "theme-light");
      setActive(true);
      setAriaActive(false);
      document.querySelector(":root").setAttribute("data-theme", "light");
    } else {
      localStorage.setItem("theme", "theme-dark");
      setActive(false);
      setAriaActive(true);
      document.querySelector(":root").setAttribute("data-theme", "dark");
    }
  }

  function handleOnClick() {
    changeThemeAndToggle();
  }

  function handleKeypress(e) {
    if (e.code === "Enter") {
      changeThemeAndToggle();
    }
  }

  useEffect(() => {
    let theme = localStorage.getItem("theme");
    if (theme === "theme-dark") {
      localStorage.setItem("theme", "theme-dark");
      setActive(false);
      setAriaActive(true);
      document.querySelector(":root").setAttribute("data-theme", "dark");
    } else if (theme === "theme-light") {
      localStorage.setItem("theme", "theme-light");
      setActive(true);
      setAriaActive(false);
      document.querySelector(":root").setAttribute("data-theme", "light");
    } else {
      let prefersLightTheme = window.matchMedia(
        "(prefers-color-scheme: light)"
      );
      if (prefersLightTheme.matches) {
        localStorage.setItem("theme", "theme-light");
        setActive(true);
        setAriaActive(false);
        document.querySelector(":root").setAttribute("data-theme", "light");
      } else {
        localStorage.setItem("theme", "theme-dark");
        setActive(false);
        setAriaActive(true);
        document.querySelector(":root").setAttribute("data-theme", "dark");
      }
    }
  }, []);

  const context = {
    active,
    ariaActive,
    handleOnClick,
    handleKeypress,
  };

  return (
    <ThemeContext.Provider value={context}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
