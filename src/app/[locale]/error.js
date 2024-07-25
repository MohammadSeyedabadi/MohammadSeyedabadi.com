"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

export default function Error({ error, reset }) {
  const { locale } = useParams();

  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error("CONSOLE", error);
  }, [error]);

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <h1>
        {locale == "en"
          ? "Something went wrong! please try again."
          : "مشکلی پیش اومد! لطفا دوباره امتحان کنید."}
      </h1>
      <button
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        {locale == "en" ? "Try again" : "دوباره امتحان کنید"}
      </button>
    </div>
  );
}
