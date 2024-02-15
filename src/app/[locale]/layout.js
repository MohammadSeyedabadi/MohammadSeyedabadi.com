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
      </body>
    </html>
  );
}
