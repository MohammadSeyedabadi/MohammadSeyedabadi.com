"use client";

import { useRef } from "react";
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

  const dialog = useRef(null);
  return (
    <>
      <button
        onClick={() => dialog.current.showModal()}
        className="cursor-pointer me-3 rtl:ms-3 font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-solid border-neutral-300 hover:border-neutral-500 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-neutral-300 active:scale-95"
      >
        {PreferencesT}
      </button>

      <dialog
        className="p-4 bg-neutral-100 rounded-xl border-4 border-solid border-neutral-950 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500"
        ref={dialog}
        dir="ltr"
      >
        <div className="flex gap-2">
          <button
            className="relative flex h-6 w-6 rounded-full active:scale-75"
            onClick={() => dialog.current.close()}
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-300 opacity-75" />
            <span className="relative inline-flex rounded-full h-6 w-6 bg-rose-500 dark:bg-rose-300" />
          </button>
          <button
            className="h-6 w-6 rounded-full bg-neutral-300 dark:bg-neutral-500"
            disabled
          />
          <button
            className="h-6 w-6 rounded-full bg-neutral-300 dark:bg-neutral-500"
            disabled
          />
        </div>
        <div className="mt-6 flex flex-col items-center">
          <div className="flex items-center gap-2">
            <div className="text-2xl">{Theme}:</div>
            <div>
              <Toggle />
            </div>
          </div>
          <div className="mt-2 flex gap-2">
            <button
              className={`text-sm font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-solid border-neutral-300 hover:border-rose-500 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-rose-300 active:scale-95 ${
                active || systemState
                  ? null
                  : "border-b-rose-500 dark:border-b-rose-300"
              }`}
              onClick={setDarkTheme}
            >
              {Dark}
            </button>
            <button
              className={`text-sm font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-solid border-neutral-300 hover:border-rose-500 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-rose-300 active:scale-95 ${
                active && !systemState
                  ? "border-b-rose-500 dark:border-b-rose-300"
                  : null
              }`}
              onClick={setLightTheme}
            >
              {Light}
            </button>
            <button
              className={`text-sm font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-solid border-neutral-300 hover:border-rose-500 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-rose-300 active:scale-95 ${
                systemState
                  ? "border-b-rose-500 dark:border-b-rose-300"
                  : null
              }`}
              onClick={setSystemTheme}
            >
              {System}
            </button>
          </div>
          <div className="mt-6">
            <div className="flex items-baseline gap-2">
              <div className="text-2xl">{Language}:</div>
              <span className="relative">
                <span
                  className="block absolute -inset-1 -skew-y-3 bg-rose-500 dark:bg-rose-300"
                  aria-hidden="true"
                ></span>
                <span className="relative text-neutral-100 dark:text-neutral-800 text-xl">
                  {LanguageStatus}
                </span>
              </span>
            </div>
          </div>
          <div className="mt-2 flex gap-2">
            <button
              className={`text-sm font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-solid border-neutral-300 hover:border-rose-500 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-rose-300 active:scale-95 ${
                lang == "en"
                  ? "border-b-rose-500 dark:border-b-rose-300"
                  : ""
              }`}
              onClick={() => changeLang("en", params)}
            >
              English
            </button>
            <button
              className={`text-sm font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-solid border-neutral-300 hover:border-rose-500 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-rose-300 active:scale-95 ${
                lang == "en"
                  ? ""
                  : "border-b-rose-500 dark:border-b-rose-300"
              }`}
              onClick={() => changeLang("fa", params)}
              lang="fa"
            >
              فارسی
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
