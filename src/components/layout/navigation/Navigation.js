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
        <ul className="flex items-center column gap-x-6 gap-y-7 flex-wrap mt-10 ps-0 list-none rtl:justify-items-end rtl:flex-row-reverse text-sm">
          <li className="ps-0 mb-0">
            <Preferences prefencesTranslations={prefencesTranslations} />
          </li>

          <li className="ps-0 mb-0">
            <Link
              href="/"
              className={`text-center font-medium py-2 px-3 bg-neutral-100/45 rounded-xl border-3 border-solid border-neutral-300 hover:border-indigo-500 ${
                pathname === "/fa" || pathname === "/en"
                  ? "border-b-indigo-500"
                  : ""
              }`}
            >
              {Home}
            </Link>
          </li>

          {/* <li className="ps-0 mb-0">
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

          <li className="ps-0 mb-0">
            <Link
              href="/projects"
              className={`text-center font-medium py-2 px-3 bg-neutral-100/45 rounded-xl border-3 border-solid border-neutral-300 hover:border-indigo-500 ${
                pathname === "/fa/پروژه-ها" || pathname === "/en/projects"
                  ? "border-b-indigo-500"
                  : ""
              }`}
            >
              {Projects}
            </Link>
          </li>

          <li className="ps-0 mb-0">
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
