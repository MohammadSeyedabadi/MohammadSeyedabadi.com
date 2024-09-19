"use client";
import { Link } from "@/navigation";
import { usePathname } from "@/navigation";

export default function Writings() {
  const pathName = usePathname();
  return (
    <div>
      <Link
        href="/blog/notes"
        className={`${pathName == "/blog/notes" ? "active" : ""}`}
      >
        Notes
      </Link>
      <Link
        href="/blog/pc"
        className={`${pathName == "/blog/pc" ? "active" : ""}`}
      >
        PC
      </Link>
    </div>
  );
}
