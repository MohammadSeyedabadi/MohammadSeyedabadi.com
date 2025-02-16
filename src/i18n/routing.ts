import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fa"],
  defaultLocale: "en",
  // localePrefix: { mode: "always" },
  pathnames: {
    "/[slug]": "/[slug]",

    "/tags": {
      en: "/tags",
      fa: "/تگ-ها",
    },

    "/tags/[tag]": {
      en: "/tags/[tag]",
      fa: "/تگ-ها/[tag]",
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

    "/blog/code": {
      en: "/blog/code",
      fa: "/بلاگ/کد",
    },

    "/blog/code/[slug]": {
      en: "/blog/code/[slug]",
      fa: "/بلاگ/کد/[slug]",
    },

    "/blog/notes": {
      en: "/blog/notes",
      fa: "/بلاگ/یادداشت-ها",
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
  },
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
