import createMiddleware from "next-intl/middleware";
import {routing} from "./i18n/routing"

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(fa|en)/:path*"],
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
