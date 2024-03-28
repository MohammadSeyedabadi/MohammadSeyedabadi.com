import "@/styles/global-style.css";
import "@/styles/theme-light.css";
import "@/styles/theme-dark.css";
import "@/styles/toggle.css";

import CustomLayout from "@/components/layout/CustomLayout";
import { ThemeContextProvider } from "@/store/theme-context";

export const metadata = {
  metadataBase: new URL("https://mohammadseyedabadi.com"),
  alternates: {
    canonical: "/en",
    languages: {
      "en-US": "/en",
      "fa-IR": "/fa",
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

export default function LocaleLayout({ children, params: { locale } }) {
  return (
    <html lang={locale} dir={locale === "fa" ? "rtl" : "ltr"}>
      <body>
        <ThemeContextProvider>
          <CustomLayout>{children}</CustomLayout>
        </ThemeContextProvider>
        <meta
          name="google-site-verification"
          content="QWnCAn_UxxXr7sdXLaRyjd9E1eG9lWQAnlDQ31nP0rs"
        />
      </body>
    </html>
  );
}
