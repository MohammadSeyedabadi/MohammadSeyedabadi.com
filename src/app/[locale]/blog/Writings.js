"use client";
import { Link, usePathname } from "@/navigation";
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
          className={`${pathName == "/blog/notes" ? "active" : ""}`}
        >
          {translation.Notes}
        </Link>
        <Link
          href="/blog/code"
          className={`${pathName == "/blog/code" ? "active" : ""}`}
        >
          {translation.Code}
        </Link>
      </div>
      <p style={{ marginTop: "1rem" }}>
        {pathName == "/blog/notes"
          ? translation.NotesDesc
          : translation.CodeDesc}
      </p>
      <Link href="/blog/code/tags" className="button small">
        View all tags
      </Link>
    </>
  );
}
