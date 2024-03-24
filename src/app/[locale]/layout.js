import "@/styles/global-style.css";
import "@/styles/theme-light.css";
import "@/styles/theme-dark.css";
import "@/styles/toggle.css";

import CustomLayout from "@/components/layout/CustomLayout";
import { ThemeContextProvider } from "@/store/theme-context";

export default function LocaleLayout({ children, params: { locale } }) {
  return (
    <html lang={locale} dir={locale === "fa" ? "rtl" : "ltr"}>
      <body>
        <ThemeContextProvider>
          <CustomLayout>{children}</CustomLayout>
        </ThemeContextProvider>
        <meta name="google-site-verification" content="QWnCAn_UxxXr7sdXLaRyjd9E1eG9lWQAnlDQ31nP0rs" />
      </body>
    </html>
  );
}
