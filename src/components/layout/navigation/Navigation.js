"use client";

import { Link } from "@/i18n/routing";
import { usePathname, useParams } from "next/navigation";
import Preferences from "@/components/Preferences";

export default function Navigation({ translation }) {
  const {
    Home,
    About,
    Projects,
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

  const params = useParams();
  let pathname = usePathname();
  params.locale == "fa" && (pathname = decodeURI(pathname));
  // const pathnameArray = pathname.split("/");
  // if (params.locale == "fa" && pathnameArray.length == 3) {
  //   pathname = `/fa/${decodeURI(pathnameArray.pop())}`;
  // }

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

  let isBlog = false;
  if (
    pathname == "/en/blog/code" ||
    pathname == "/en/blog/notes" ||
    pathname == "/fa/بلاگ/یادداشت-ها" ||
    pathname == "/fa/بلاگ/کد"
  ) {
    isBlog = true;
  }

  return (
    <header className="max-w-6xl mx-auto px-4 sm:px-8" dir="ltr">
      <nav>
        <ul className="nav--list" id="nav-menu">
          <li>
            <Preferences prefencesTranslations={prefencesTranslations} />
          </li>

          <li>
            <Link
              href="/"
              className={`nav--link button small ${
                pathname === "/fa" || pathname === "/en" ? "active" : ""
              }`}
            >
              {Home}
            </Link>
          </li>

          {/* <li>
            <Link
              href="/me"
              className={`nav--link button small ${
                pathname === "/fa/درباره-من" || pathname === "/en/me"
                  ? "active"
                  : ""
              }`}
            >
              {About}
            </Link>
          </li> */}

          <li>
            <Link
              href="/projects"
              className={`nav--link button small ${
                pathname === "/fa/پروژه-ها" || pathname === "/en/projects"
                  ? "active"
                  : ""
              }`}
            >
              {Projects}
            </Link>
          </li>

          <li>
            <Link
              href="/blog/notes"
              className={`nav--link button small ${isBlog ? "active" : ""}`}
            >
              {Blog}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
