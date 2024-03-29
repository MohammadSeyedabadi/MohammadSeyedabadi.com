"use client";

import { Link } from "@/navigation";
import { usePathname } from "next/navigation";
import Preferences from "@/components/Preferences";
import { useParams } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const lang = useParams().locale;
  return (
    <header className="navigation container" id="navigation" dir="ltr">
      <nav className="nav--container">
        <span className="nav-tog">
          <Preferences />
        </span>

        <div className="nav--menu nav--list" id="nav-menu">
          <span
            className={
              pathname === "/fa" || pathname === "/en" ? "active--link" : ""
            }
          >
            <Link href="/" className="nav--link nav--home ">
              <span className="nav__name">
                {lang === "en" ? "Home" : "صفحه‌ی اصلی"}
              </span>
            </Link>
          </span>
          <span
            className={
              pathname === "/fa/me" || pathname === "/en/me"
                ? "active--link"
                : ""
            }
          >
            <Link href="/me" className="nav--link nav--about">
              <span className="nav__name">
                {lang === "en" ? "About" : "درباره‌ی من"}
              </span>
            </Link>
          </span>

          <span
            className={
              pathname === "/fa/projects" || pathname === "/en/projects"
                ? "active--link"
                : ""
            }
          >
            <Link href="/projects" className="nav--link nav--projects">
              <span className="nav__name">
                {lang === "en" ? "Projects" : "پروژه‌ها"}
              </span>
            </Link>
          </span>
          {/* <span
            className={
              pathname === "/fa/contact" || pathname === "/en/contact"
                ? "active--link"
                : ""
            }
          >
            <Link href="/contact" className="nav--link nav--contact">
              <span className="nav__name">
                {lang === "en" ? "Contact" : "تماس"}
              </span>
            </Link>
          </span> */}

          <span
            className={
              pathname === "/fa/blog" || pathname === "/en/blog"
                ? "active--link"
                : ""
            }
          >
            <Link href="/blog" className="nav--link nav--blog">
              <span className="nav__name">
                {lang === "en" ? "Blog" : "بلاگ"}
              </span>
            </Link>
          </span>
        </div>
      </nav>
    </header>
  );
}
