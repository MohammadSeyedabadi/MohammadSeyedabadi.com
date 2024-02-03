import { useTranslations } from "next-intl";
import config from "@/utils/config";
import Hero from "@/components/Hero";
import ContactsFrom from "./ContactsForm";

export const metadata = {
  title: `Contact Me | ${config.siteTitle}`,
  description: "Send me your messages!",
};

export default function Contact() {
  const t = useTranslations("Contacts");
  return (
    <>
      <div className="container">
        <div className="grid">
          <div className="article-content">
            <Hero title={t("Contacts")} />
            <section className="segment small">
              <div className="post-content">
                <p>{t("desc")}</p>
              </div>
            </section>
          </div>
          <ContactsFrom />
        </div>
      </div>
    </>
  );
}
