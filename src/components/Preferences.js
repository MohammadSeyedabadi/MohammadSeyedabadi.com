
import { useEffect } from "react";
import Toggle from "./layout/navigation/Toggle";

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

          <button
            data-close-modal
            style={{
              marginTop: "5rem",
              alignSelf: "center",
              textAlign: "start",
            }}
          >
            Close
          </button>
        </div>
      </dialog>
    </>
  );
}
