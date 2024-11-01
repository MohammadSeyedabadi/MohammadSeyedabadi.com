"use client";
import { Link, usePathname } from "@/i18n/routing";
import { useParams } from "next/navigation";

export default function Writings({ translation }) {
  let pathName = usePathname();
  const { locale } = useParams();
  pathName = locale == "fa" ? decodeURI(pathName) : pathName;

  return (
    <>
      <div>
        <Link
          href="/blog/notes"
          className={`nav--link button small ${pathName == "/blog/notes" ? "active" : ""}`}
        >
          {translation.Notes}
        </Link>
        <Link
          href="/blog/code"
          className={`nav--link button small ${pathName == "/blog/code" ? "active" : ""}`}
        >
          {translation.Code}
        </Link>
      </div>
      <p style={{ marginTop: "1rem" }}>
        {pathName == "/blog/notes"
          ? translation.NotesDesc
          : translation.CodeDesc}
        <Link
          href={pathName == "/blog/notes" ? "/tags" : "/blog/code/tags"}
          className="writings-link"
        >
          {translation.ViewAllTags}
        </Link>
      </p>
    </>
  );
}
