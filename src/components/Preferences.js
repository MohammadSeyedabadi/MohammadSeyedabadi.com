"use client";

import { useEffect } from "react";
import Toggle from "./layout/navigation/Toggle";
import { useParams } from "next/navigation";
import { usePathname } from "../navigation";
import { useRouter } from "../navigation";
import { useContext } from "react";
import ThemeContext from "@/store/theme-context";

export default function Preferences({ prefencesTranslations }) {
  const {
    PreferencesT,
    Theme,
    Dark,
    Light,
    System,
    Language,
    LanguageStatus,
    Close,
  } = prefencesTranslations;
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
        {PreferencesT}
      </button>

      <dialog data-modal>
        <div className="modal--btn-wrapper">
          <button className="modal--btn-close" data-close-modal></button>
          <button className="modal--btn"></button>
          <button className="modal--btn"></button>
        </div>
        <div className="Preferences--wrapper">
          <div
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "center",
            }}
          >
            <div
              className="text-white"
              style={{
                margin: "0px 21px 0px 0px",
                fontSize: "2rem",
                fontWeight: "500",
              }}
            >
              {Theme}:
            </div>
            <div>
              <Toggle />
            </div>
          </div>
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "center",
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
              {Dark}
            </button>
            <button
              className={`${active && !systemState ? "active" : null}`}
              style={{
                marginRight: "0.5rem",
                fontWeight: "500",
              }}
              onClick={setLightTheme}
            >
              {Light}
            </button>
            <button
              className={`${systemState ? "active" : null}`}
              style={{
                fontWeight: "500",
              }}
              onClick={setSystemTheme}
            >
              {System}
            </button>
          </div>

          <div
            style={{
              marginTop: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  fontSize: "2rem",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                {Language}:
              </p>
              <p style={{ fontFamily: "monospace", fontStyle: "italic" }}>
                {LanguageStatus}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "0.2rem",
              }}
            >
              <button
                className={lang == "en" ? "" : "active"}
                style={{
                  marginRight: "0.5rem",
                  fontWeight: "500",
                }}
                onClick={() => changeLang("fa")}
                lang="fa"
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
          </div>
        </div>
      </dialog>
    </>
  );
}
