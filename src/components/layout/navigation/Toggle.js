"use client";

import { useContext } from "react";
import ThemeContext from "@/store/theme-context";

function Toggle() {
  const { ariaActive, active, changeTheme, handleKeypress } =
    useContext(ThemeContext);
  return (
    <div className="container--toggle">
      <input
        role="switch"
        aria-checked={ariaActive}
        onKeyDown={handleKeypress}
        type="checkbox"
        id="toggle"
        className="toggle--checkbox"
        onClick={changeTheme}
        checked={active}
        readOnly
      />
      <label htmlFor="toggle" className="toggle--label">
        <span className="toggle--label-background"></span>
        <p className="offscreen text-center">dark mode toggle</p>
      </label>
    </div>
  );
}

export default Toggle;
