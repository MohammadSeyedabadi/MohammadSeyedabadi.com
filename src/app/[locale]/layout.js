import "@/styles/global-style.css";
import "@/styles/theme-light.css";
import "@/styles/theme-dark.css";
import "@/styles/toggle.css";

import CustomLayout from "@/components/layout/CustomLayout";
import { PreferencesContextProvider } from "@/store/preferences-context";
import { notFound } from "next/navigation";

export const metadata = {
  metadataBase: new URL("https://mohammadseyedabadi.com"),
  alternates: {
    languages: {
      en: "/en",
      fa: "/fa",
    },
  },

  openGraph: {
    images: "/opengraph-image.jpg",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: "#618be1",
};

export default async function LocaleLayout(props) {
  const params = await props.params;

  const { locale } = params;

  // Ensure that the incoming `locale` is valid
  if (!["en", "fa"].includes(locale)) {
    notFound();
  }

  const { children } = props;

  return (
    <html
      lang={locale}
      dir={locale === "fa" ? "rtl" : "ltr"}
      className="bg-[floralwhite] dark:bg-neutral-900"
    >
      <body>
        <PreferencesContextProvider>
          <CustomLayout>{children}</CustomLayout>
        </PreferencesContextProvider>
        <meta
          name="google-site-verification"
          content="QWnCAn_UxxXr7sdXLaRyjd9E1eG9lWQAnlDQ31nP0rs"
        />
      </body>
    </html>
  );
}
