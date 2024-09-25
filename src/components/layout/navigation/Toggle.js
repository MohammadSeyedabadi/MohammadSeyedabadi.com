"use client";

import { useContext } from "react";
import PreferencesContext from "@/store/preferences-context";

function Toggle() {
  const { ariaActive, active, changeTheme, handleKeypress } =
    useContext(PreferencesContext);
  return (
    <div className="container--toggle">
      <input
        role="switch"
        aria-checked={ariaActive}
        onKeyDown={handleKeypress}
        type="checkbox"
        id="toggle"
        className="toggle--checkbox offscreen"
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
