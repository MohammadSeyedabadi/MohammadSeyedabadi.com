import { useTranslations } from "next-intl";
import config from "@/utils/config";
import Hero from "@/components/Hero";

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
            <Hero title="Contacts" />
            <section className="segment small">
              <div className="post-content">
                <p>{t("desc")}</p>
              </div>
            </section>
          </div>
          <aside>
            <div className="contact-sidebar-card">
              <form>
                <div>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    required
                    disabled
                    value="disabled"
                  />
                </div>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    id="email"
                    required
                    disabled
                    value="disabled"
                  />
                </div>
                <div>
                  <label htmlFor="message">Message:</label>
                  <textarea id="message" required disabled value="disabled" />
                </div>
                <div>Button</div>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
