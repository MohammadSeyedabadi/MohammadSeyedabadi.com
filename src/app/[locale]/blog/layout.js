"use client";
import Hero from "@/components/Hero";
import { Link } from "@/navigation";
import { usePathname } from "@/navigation";

export default function layout({ children }) {
  const pathName = usePathname();
  return (
    <section className="container markdown-content">
      <div className="grid">
        <div className="article-content">
          <Hero title="Writting">
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
          </Hero>
          <section className="segment">
            <div className="posts">{children}</div>
          </section>
        </div>
        {/* <div className="sidebar-content"></div> */}
      </div>
    </section>
  );
}
