import { useTranslations } from "next-intl";
export default function Footer() {
  const t = useTranslations("Footer");
  const links = [
    {
      url: "https://github.com/MohammadSeyedabadi",
      icon: "/images/nav-github.png",
    },
  ];

  return (
    <footer className="footer">
      <section>
        <nav>
          <a
            href="https://www.linkedin.com/in/mohammad-seyedabadi-397a61256/"
            title={t("LinkedIn")}
            target="_blank"
            rel="noopener noreferrer"
            key="https://www.linkedin.com/in/mohammad-seyedabadi-397a61256/"
          >
            <span>{t("LinkedIn")}</span>
            <img src="/images/nav-linkedin.png" alt={t("LinkedIn")} />
          </a>
          <a
            href="https://github.com/MohammadSeyedabadi"
            title={t("GitHub")}
            target="_blank"
            rel="noopener noreferrer"
            key="https://github.com/MohammadSeyedabadi"
          >
            <span>{t("GitHub")}</span>
            <img src="/images/nav-github.png" alt={t("GitHub")} />
          </a>
        </nav>
      </section>
    </footer>
  );
}
