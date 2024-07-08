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
    setsystemState(false);
  }

  function setLightTheme() {
    localStorage.setItem("theme", "light-theme");
    setThemeDatails("light-theme");
    setsystemState(false);
  }

  function setSystemTheme() {
    let prefersLightTheme = window.matchMedia("(prefers-color-scheme: light)");
    localStorage.setItem("theme", "system-theme");
    if (prefersLightTheme.matches) {
      setThemeDatails("light-theme", true);
    } else {
      setThemeDatails("dark-theme", true);
    }
    setsystemState(true);
  }

  function setThemeDatails(theme, SystemTheme) {
    if (SystemTheme === undefined) {
      if (theme === "dark-theme") {
        setActive(false);
        setAriaActive(true);

        document
          .querySelector(":root")
          .setAttribute("data-theme", "dark-theme");
      } else if (theme === "light-theme") {
        setActive(true);
        setAriaActive(false);
        document
          .querySelector(":root")
          .setAttribute("data-theme", "light-theme");
      }
    } else if (SystemTheme === true) {
      if (theme === "dark-theme") {
        setActive(false);
        setAriaActive(true);
        document
          .querySelector(":root")
          .setAttribute("data-theme", "dark-theme");
      } else if (theme === "light-theme") {
        setActive(true);
        setAriaActive(false);
        document
          .querySelector(":root")
          .setAttribute("data-theme", "light-theme");
      }
    }
  }

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark-theme") {
      setDarkTheme();
    } else if (localStorage.getItem("theme") === "light-theme") {
      setLightTheme();
    } else {
      setSystemTheme();
    }

    window
      .matchMedia("(prefers-color-scheme: light)")
      .addEventListener("change", () => {
        if (localStorage.getItem("theme") === "system-theme") {
          setSystemTheme();
        }
      });

    window.addEventListener("storage", (event) => {
      if (event.storageArea.theme === "dark-theme") {
        setDarkTheme();
      } else if (event.storageArea.theme === "light-theme") {
        setLightTheme();
      } else {
        setSystemTheme();
      }
    });
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
