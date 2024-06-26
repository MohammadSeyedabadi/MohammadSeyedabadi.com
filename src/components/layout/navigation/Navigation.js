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
    LanguageStatus,
    Close,
  } = translation;
  const pathname = usePathname();

  const prefencesTranslations = {
    PreferencesT,
    Theme,
    Dark,
    Light,
    System,
    Language,
    LanguageStatus,
    Close,
  };

  return (
    <header className="container" dir="ltr">
      <nav>
        <ul className="nav--list" id="nav-menu">
          <li className="nav-tog">
            <Preferences prefencesTranslations={prefencesTranslations} />
          </li>

          <li
            className={
              pathname === "/fa" || pathname === "/en" ? "active--link" : ""
            }
          >
            <Link href="/" className="nav--link nav--link-home ">
              {Home}
            </Link>
          </li>

          <li
            className={
              pathname === "/fa/me" || pathname === "/en/me"
                ? "active--link"
                : ""
            }
          >
            <Link href="/me" className="nav--link nav--link-about">
             {About}
            </Link>
          </li>

          <li
            className={
              pathname === "/fa/projects" || pathname === "/en/projects"
                ? "active--link"
                : ""
            }
          >
            <Link href="/projects" className="nav--link nav--link-projects">
             {Projects}
            </Link>
          </li>

          <li
            className={
              pathname === "/fa/blog" || pathname === "/en/blog"
                ? "active--link"
                : ""
            }
          >
            <Link href="/blog" className="nav--link nav--link-blog">
             {Blog}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
