import {createSharedPathnamesNavigation} from 'next-intl/navigation';

export const locales = ['en', 'fa'];
export const localePrefix = 'always'; // Default

export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation({locales, localePrefix});

// import {
//   createLocalizedPathnamesNavigation,
//   Pathnames,
// } from "next-intl/navigation";

// export const locales = ["en", "fa"];
// export const localePrefix = "always"; // Default

// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
// export const pathnames = {
  // If all locales use the same pathname, a
  // single external path can be provided.
  // "/": "/",
  // "/blog": "/blog",

  // If locales use different paths, you can
  // specify each external path per locale.
  // "/": "/",
  // "/me": {
  //   en: "/me",
  //   fa: "/درباره-من",
  // },
  // "/projects" : {
  //   en:"/projects",
  //   fa:"پروژه-ها"
  // }

  // // Dynamic params are supported via square brackets
  // "/news/[articleSlug]-[articleId]": {
  //   en: "/news/[articleSlug]-[articleId]",
  //   de: "/neuigkeiten/[articleSlug]-[articleId]",
  // },

  // // Also (optional) catch-all segments are supported
  // "/categories/[...slug]": {
  //   en: "/categories/[...slug]",
  //   de: "/kategorien/[...slug]",
  // },
// };

// export const { Link, redirect, usePathname, useRouter, getPathname } =
//   createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
