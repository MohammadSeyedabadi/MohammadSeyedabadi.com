"use client";

import { useEffect } from "react";
import Toggle from "./layout/navigation/Toggle";
import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { useRouter } from "../navigation";

export default function Preferences() {
  const pathname = usePathname();
  const lang = useParams().locale;
  const router = useRouter();

  function changeLang(L) {
    // L => Language
    const pathnameSlashSplitArray = pathname.split("/");
    const pathnameWithOutLocale = pathnameSlashSplitArray
      .slice(2, pathnameSlashSplitArray.length)
      .join("/");
    console.log(pathnameWithOutLocale);
    router.replace(`/${pathnameWithOutLocale}`, {
      locale: L,
    }); //TODO: write regx or logic with shift slice join ...
  }

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
      <button data-open-modal>
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
                fontWeight: "700",
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
              style={{
                marginRight: "0.5rem",
                fontWeight: "700",
              }}
            >
              dark
            </button>
            <button
              style={{
                marginRight: "0.5rem",
                fontWeight: "700",
              }}
            >
              light
            </button>
            <button
              style={{
                fontWeight: "700",
              }}
            >
              system
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
                fontWeight: "700",
              }}
            >
              {lang === "en" ? "Language :" : "زبان :"}
            </p>
            <button
              style={{
                marginRight: "0.5rem",
                fontWeight: "700",
              }}
              onClick={() => changeLang("fa")}
            >
              فا
            </button>
            <button
              style={{
                fontWeight: "700",
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
                fontWeight: "700",
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
