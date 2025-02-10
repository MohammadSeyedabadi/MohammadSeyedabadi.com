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
          className={`font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-solid border-neutral-300 hover:border-indigo-500 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-indigo-300 inline-block active:scale-95 hover:visited:border-rose-500 hover:dark:visited:border-rose-300 ${
            pathName == "/blog/notes" ? "border-b-indigo-500 dark:border-b-indigo-300 visited:border-b-rose-500 visited:dark:border-b-rose-300" : ""
          }`}
        >
          {translation.Notes}
        </Link>
        <Link
          href="/blog/code"
          className={`font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-solid border-neutral-300 hover:border-indigo-500 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-indigo-300 inline-block active:scale-95 hover:visited:border-rose-500 hover:dark:visited:border-rose-300 ${
            pathName == "/blog/code" ? "border-b-indigo-500 dark:border-b-indigo-300 visited:border-b-rose-500 visited:dark:border-b-rose-300" : ""
          }`}
        >
          {translation.Code}
        </Link>
      </div>
      <p className="my-10 text-neutral-800 dark:text-neutral-300">
        {pathName == "/blog/notes"
          ? translation.NotesDesc
          : translation.CodeDesc}
        <Link href={pathName == "/blog/notes" ? "/tags" : "/blog/code/tags"}>
          {translation.ViewAllTags}
        </Link>
      </p>
    </>
  );
}
