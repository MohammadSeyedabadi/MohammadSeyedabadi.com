"use client";
import { Link, usePathname } from "@/i18n/routing";
import { useParams } from "next/navigation";

export default function Writings({ translation }) {
  let pathName = usePathname();
  const { locale } = useParams();
  pathName = locale == "fa" ? decodeURI(pathName) : pathName;

  return (
    <>
      <div className="text-sm flex gap-x-6">
        <Link
          href="/blog/notes"
          className={`font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-solid border-neutral-300 hover:border-rose-500 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-rose-300 inline-block active:scale-95 hover:visited:border-indigo-500 hover:dark:visited:border-indigo-300 ${
            pathName == "/blog/notes"
              ? "border-b-rose-500 dark:border-b-rose-300 visited:border-b-indigo-500 visited:dark:border-b-indigo-300"
              : ""
          }`}
        >
          {translation.Notes}
        </Link>
        <Link
          href="/blog/code"
          className={`font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-solid border-neutral-300 hover:border-rose-500 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-rose-300 inline-block active:scale-95 hover:visited:border-indigo-500 hover:dark:visited:border-indigo-300 ${
            pathName == "/blog/code"
              ? "border-b-rose-500 dark:border-b-rose-300 visited:border-b-indigo-500 visited:dark:border-b-indigo-300"
              : ""
          }`}
        >
          {translation.Code}
        </Link>
      </div>
      <p className="my-10 text-neutral-800 dark:text-neutral-300">
        {pathName == "/blog/notes"
          ? translation.NotesDesc
          : translation.CodeDesc}
        <Link
          href={pathName == "/blog/notes" ? "/tags" : "/blog/code/tags"}
          className="hover:underline text-rose-500 dark:text-rose-300 inline-block active:scale-95 visited:text-indigo-500 dark:visited:text-indigo-300"
        >
          {translation.ViewAllTags}
        </Link>
      </p>
    </>
  );
}
