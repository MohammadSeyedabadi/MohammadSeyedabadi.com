import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
import { locales, localePrefix } from "./nextintlconfig";
import { pathnames } from "./nextintlconfig";

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
