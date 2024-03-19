import createMiddleware from 'next-intl/middleware';
import {locales, localePrefix} from './navigation';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'fa'],
  localePrefix,
  // Used when no locale matches
  defaultLocale: 'en'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(fa|en)/:path*']
};

// import createMiddleware from "next-intl/middleware";
// import { locales, localePrefix, pathnames } from "./navigation";

// export default createMiddleware({
//   locales: ['en', 'fa'],
//   defaultLocale: "en",
//   localePrefix,
//   locales,
//   pathnames,
// });

// export const config = {
//   // Match only internationalized pathnames
//   matcher: ['/', '/(fa|en)/:path*']
// };