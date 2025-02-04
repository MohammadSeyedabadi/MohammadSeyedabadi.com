"use client";

import { useEffect } from "react";
import Toggle from "./layout/navigation/Toggle";
import { useParams } from "next/navigation";
import { useContext } from "react";
import PreferencesContext from "@/store/preferences-context";

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

  const params = useParams();
  const lang = params.locale;
  const {
    systemState,
    setDarkTheme,
    setLightTheme,
    setSystemTheme,
    active,
    changeLang,
  } = useContext(PreferencesContext);

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
      <button
        data-open-modal
        className="cursor-pointer me-3 rtl:ms-3 text-center font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-solid border-neutral-300 hover:border-neutral-500 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-neutral-300 active:scale-95"
      >
        {PreferencesT}
      </button>

      <dialog data-modal>
        <div className="modal--btn-wrapper">
          <button
            className="modal--btn-closee bg-red-950 w-4"
            data-close-modal
          ></button>
          <button className="modal--btn  w-4"></button>
          <button className="modal--btn  w-4"></button>
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
                className={lang == "en" ? "active" : ""}
                style={{
                  marginRight: "0.5rem",
                  fontWeight: "500",
                }}
                onClick={() => changeLang("en", params)}
              >
                ENG
              </button>
              <button
                className={lang == "en" ? "" : "active"}
                style={{
                  fontWeight: "500",
                }}
                onClick={() => changeLang("fa", params)}
                lang="fa"
              >
                فا
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
