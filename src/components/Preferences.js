import { useEffect } from "react";
import Toggle from "./layout/navigation/Toggle";
import { Link } from "../navigation";

export default function Preferences() {
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
      <button data-open-modal>Preferences</button>

      <dialog data-modal>
        <div className="Preferences--wrapper">
          <Toggle />
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
              Language:{" "}
            </p>
            <Link
              href="/"
              className="button"
              style={{
                marginRight: "1rem",
                fontWeight: "700",
              }}
              locale="fa"
            >
              فا
            </Link>
            <Link
              href="/"
              className="button"
              style={{
                fontWeight: "700",
              }}
              locale="en"
            >
              ENG
            </Link>
          </div>
          <div style={{ marginTop: "2rem" }}>
            <button
              data-close-modal
              style={{
                fontWeight: "700",
              }}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
