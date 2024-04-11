import { useTranslations } from "next-intl";
import config from "@/utils/config";
import Hero from "@/components/Hero";
import ContactsFrom from "./ContactsForm";

// export const metadata = {
//   title: `Contact Me | ${config.siteTitle}`,
//   description: "Send me your messages!",
// };

export async function generateMetadata({ params }) {
  const { locale, slug } = params;

  return {
    title: `${
      locale == "en"
        ? `Contacts | ${config.enSiteTitle}`
        : `تماس | ${config.faSiteTitle}`
    }`,
    description:
      locale == "en"
        ? "Send me your messages!"
        : "پیام خود را برای من ارسال کنید!",
    alternates: {
      languages: {
        en: "/en/contact",
        fa: "/fa/contact",
      },
    },
  };
}

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
