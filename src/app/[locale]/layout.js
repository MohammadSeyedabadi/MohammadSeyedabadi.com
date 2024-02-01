import "@/styles/global-style.css";
import "@/styles/dark-mode.css";
import "@/styles/toggle.css";

import CustomLayout from "@/components/layout/CustomLayout";
import { ThemeContextProvider } from "@/store/theme-context";
import Navigation from "@/components/layout/navigation/Navigation";
import Footer from "@/components/Footer";

export default function LocaleLayout({ children, params: { locale } }) {
  return (
    <html lang={locale}>
      <body>
        <ThemeContextProvider>
          <CustomLayout>{children}</CustomLayout>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
