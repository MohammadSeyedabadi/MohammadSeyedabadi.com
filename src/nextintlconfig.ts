import { LocalePrefix, Pathnames } from "next-intl/routing";

export const locales = ["en", "fa"] as const;
export const localePrefix = "always" satisfies LocalePrefix; // default

// The `pathnames` object holds pairs of internal and
// external paths. Based on the locale, the external
// paths are rewritten to the shared, internal ones.
export const pathnames = {
  // If all locales use the same pathname, a single
  // external path can be used for all locales
  "/[slug]": "/[slug]",
  
  "/notes": {
    en: "/notes",
    fa: "/یادداشت-ها",
  },

  // If locales use different paths, you can
  // specify each external path per locale
  "/me": {
    en: "/me",
    fa: "/درباره-من",
  },

  // Dynamic params are supported via square brackets
  "/projects": {
    en: "/projects",
    fa: "/پروژه-ها",
  },

  "/game": {
    en: "/game",
    fa: "/بازی",
  },

  "/blog": {
    en: "/blog",
    fa: "/بلاگ",
  },

  "/blog/[slug]": {
    en: "/blog/[slug]",
    fa: "/بلاگ/[slug]",
  },

  "/tags/[tag]": {
    en: "/tags/[tag]",
    fa: "/تگ-ها/[tag]",
  },

  "/categories/[category]": {
    en: "/categories/[category]",
    fa: "/دسته-بندی-ها/[category]",
  },

  //   // Dynamic params are supported via square brackets
  //   '/news/[articleSlug]-[articleId]': {
  //     en: '/news/[articleSlug]-[articleId]',
  //     fa: '/neuigkeiten/[articleSlug]-[articleId]'
  //   },

  //   // Static pathnames that overlap with dynamic segments
  //   // will be prioritized over the dynamic segment
  //   "/news/just-in": {
  //     en: "/news/just-in",
  //     fa: "/neuigkeiten/aktuell",
  //   },

  //   // Also (optional) catch-all segments are supported
  //   "/categories/[...slug]": {
  //     en: "/categories/[...slug]",
  //     fa: "/kategorien/[...slug]",
  //   },
} satisfies Pathnames<typeof locales>;
