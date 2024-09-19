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
      <p className="hero-description small width">
        {pathName == "/blog/notes"
          ? translation.NotesDesc
          : translation.CodeDesc}
      </p>
    </>
  );
}
