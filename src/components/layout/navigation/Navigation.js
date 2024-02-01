"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { usePathname } from 'next/navigation'
import Preferences from "@/components/Preferences";

export default function Navigation() {
  const lang = useParams().locale;
  const pathname = usePathname()
  return (
    <header className="navigation container" id="navigation">
      <nav className="nav--container">
        <span className="nav-tog">
          <Preferences />
        </span>

        <div className="nav--menu nav--list" id="nav-menu">
          <span className={(pathname === "/fa" || pathname === "/en") ? "active--link" : ""}>
            <Link href={lang === "fa" ? "/fa" : "/en"} className="nav--link nav--home ">
              <span className="nav__name">Home</span>
            </Link>
          </span>
          <span className={(pathname === "/fa/me" || pathname === "/en/me" ) ? "active--link" : ""}>
            <Link href={lang === "fa" ? "/fa/me" : "/en/me"} className="nav--link nav--about">
              <span className="nav__name">About</span>
            </Link>
          </span>

          <span className={(pathname === "/fa/projects" || pathname === "/en/projects") ? "active--link" : ""}>
            <Link href={lang === "fa" ? "/fa/projects" : "/en/projects"} className="nav--link nav--projects">
              <span className="nav__name">Projects</span>
            </Link>
          </span>
          <span className={(pathname === "/fa/contact" || pathname === "/en/contact") ? "active--link" : ""}>
            <Link href={lang === "fa" ? "/fa/contact" : "/en/contact"} className="nav--link nav--contact">
              <span className="nav__name">Contact</span>
            </Link>
          </span>

          <span className={(pathname === "/fa/blog" || pathname === "/en/blog" )? "active--link" : ""}>
            <Link href={lang === "fa" ? "/fa/blog" : "/en/blog"} className="nav--link nav--blog">
              <span className="nav__name">Blog</span>
            </Link>
          </span>
        </div>
      </nav>
    </header>
  );
}
