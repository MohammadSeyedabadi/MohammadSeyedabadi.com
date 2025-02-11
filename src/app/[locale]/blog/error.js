"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/routing";

export default function Error({ error, reset }) {
  const { locale } = useParams();

  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error("CONSOLE", error);
  }, [error]);

  return (
    <div className="max-w-fit mx-auto px-4 sm:px-8 text-center p-4 bg-neutral-100/45 rounded-xl border-2 border-solid border-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500">
      <h1>
        {locale == "en"
          ? "Something went wrong! please try again."
          : "مشکلی پیش اومد! لطفا دوباره امتحان کنید. "}
      </h1>
      <button
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
        className="mt-4 text-sm font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-solid border-neutral-300 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 hover:border-indigo-500 hover:dark:border-indigo-300 active:scale-95"
      >
        {locale == "en" ? "Try again" : "دوباره امتحان کنید"}
      </button>
    </div>
  );
}
