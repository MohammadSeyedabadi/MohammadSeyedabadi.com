"use client";

import { useEffect } from "react";
import Toggle from "./layout/navigation/Toggle";
import { useParams } from "next/navigation";
import { usePathname } from "../navigation";
import { useRouter } from "../navigation";
import { useContext } from "react";
import ThemeContext from "@/store/theme-context";

export default function Preferences() {
  const pathname = usePathname();
  const lang = useParams().locale;
  const router = useRouter();

  function changeLang(L) {
    router.replace(pathname, { locale: L });
  }

  const { systemState, setDarkTheme, setLightTheme, setSystemTheme, active } =
    useContext(ThemeContext);

  useEffect(() => {
    const openButton = document.querySelector("[data-open-modal]");
    const closeButton = document.querySelector("[data-close-modal]");
    const modal = document.querySelector("[data-modal]");

    openButton.addEventListener("click", () => {
      modal.showModal();
    });

    closeButton.addEventListener("click", () => {
      modal.close();
    });
  }, []);
  return (
    <>
      <button data-open-modal className="small">
        {lang === "en" ? "Preferences" : "تنظیمات"}
      </button>

      <dialog data-modal>
        <div className="Preferences--wrapper">
          <div style={{ display: "flex", alignItems: "end" }}>
            <div
              className="text-white"
              style={{
                margin: "0px 21px 0px 0px",
                fontSize: "2rem",
                fontWeight: "500",
              }}
            >
              {lang === "en" ? "Theme :" : "تم :"}
            </div>
            <div>
              <Toggle />
            </div>
          </div>
          <div
            style={{
              marginTop: "2rem",
            }}
          >
            <button
              className={`${active || systemState ? null : "active"}`}
              style={{
                marginRight: "0.5rem",
                fontWeight: "500",
              }}
              onClick={setDarkTheme}
            >
              {lang === "en" ? "Dark" : "تاریک"}
            </button>
            <button
              className={`${active && !systemState ? "active" : null}`}
              style={{
                marginRight: "0.5rem",
                fontWeight: "500",
              }}
              onClick={setLightTheme}
            >
              {lang === "en" ? "Light" : "روشن"}
            </button>
            <button
              className={`${systemState ? "active" : null}`}
              style={{
                fontWeight: "500",
              }}
              onClick={setSystemTheme}
            >
              {lang === "en" ? "System" : "سیستم"}
            </button>
          </div>

          <div
            style={{
              marginTop: "2rem",
            }}
          >
            <p
              style={{
                marginBottom: "0.2rem",
                fontSize: "2rem",
                fontWeight: "500",
              }}
            >
              {lang === "en" ? "Language :" : "زبان :"}
            </p>
            <button
              className={lang == "en" ? "" : "active"}
              style={{
                marginRight: "0.5rem",
                fontWeight: "500",
              }}
              onClick={() => changeLang("fa")}
            >
              فا
            </button>
            <button
              className={lang == "en" ? "active" : ""}
              style={{
                fontWeight: "500",
              }}
              onClick={() => changeLang("en")}
            >
              ENG
            </button>
          </div>
          <div style={{ marginTop: "2rem" }}>
            <button
              data-close-modal
              style={{
                fontWeight: "500",
              }}
            >
              {lang === "en" ? "Close" : "بستن"}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
