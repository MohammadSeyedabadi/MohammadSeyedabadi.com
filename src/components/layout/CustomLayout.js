import { useTranslations } from "next-intl";
import Navigation from "./navigation/Navigation";
import Footer from "../Footer";

export default function CustomLayout(props) {
  const t = useTranslations("navigation");
  const translation = {
    Home: t("Home"),
    About: t("About"),
    Projects: t("Projects"),
  
    Blog: t("Blog"),
    PreferencesT: t("PreferencesT"),
    Theme: t("Theme"),
    Dark: t("Dark"),
    Light: t("Light"),
    System: t("System"),
    Language: t("Language"),
    LanguageStatus: t("LanguageStatus"),
    Close: t("Close"),
  };
  return (
    <>
      <Navigation translation={translation} />
      <main className="mt-20">{props.children}</main>
      <Footer />
    </>
  );
}
