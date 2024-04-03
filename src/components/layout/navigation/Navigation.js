"use client";

import { Link } from "@/navigation";
import { usePathname } from "next/navigation";
import Preferences from "@/components/Preferences";

export default function Navigation({ translation }) {
  const {
    Home,
    About,
    Projects,
    Contact,
    Blog,
    PreferencesT,
    Theme,
    Dark,
    Light,
    System,
    Language,
    Close
  } = translation;
  const pathname = usePathname();

  const prefencesTranslations = {
    PreferencesT,
    Theme,
    Dark,
    Light,
    System,
    Language,
    Close
  };

  return (
    <header className="navigation container" id="navigation" dir="ltr">
      <nav className="nav--container">
        <span className="nav-tog">
          <Preferences prefencesTranslations={prefencesTranslations} />
        </span>

        <div className="nav--menu nav--list" id="nav-menu">
          <span
            className={
              pathname === "/fa" || pathname === "/en" ? "active--link" : ""
            }
          >
            <Link href="/" className="nav--link nav--home ">
              <span className="nav__name">{Home}</span>
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
              <span className="nav__name">{About}</span>
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
              <span className="nav__name">{Projects}</span>
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
              {Contact}
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
              <span className="nav__name">{Blog}</span>
            </Link>
          </span>
        </div>
      </nav>
    </header>
  );
}
