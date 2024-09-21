import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import TitleIcon from "@/assets/TitleIcon";
import Hero from "@/components/Hero";

export async function generateMetadata() {
  const t = await getTranslations("Config");

  return {
    title: `${t("AboutMe")} | ${t("SiteTitle")}`,
    description: `${t("Read")} | ${t("SiteTitle")}`,
    alternates: {
      languages: {
        en: "/en/me",
        fa: "/fa/درباره-من",
      },
    },
  };
}

export default function AboutMe() {
  const t = useTranslations("me");
  return (
    <div className="container">
      <div className="grid">
        <div className="article-content">
          <Hero title={t("descOne")} />

          <section className="segment small">
            <div className="post-content">
              <p>
                {t("descTwo")} <Link href="/projects">{t("descThree")} </Link>
                {t("descFour")}
                <Link href="/blog"> {t("descFive")}</Link> {t("descSix")}
              </p>
              <h2 id="work-experience" style={{ position: "relative" }}>
                <a
                  href="#work-experience"
                  aria-label="work experience permalink"
                  className="anchor before"
                >
                  <TitleIcon />
                </a>
                {t("descSeven")}
              </h2>
              <p>
                {t("descEight")}{" "}
                <a
                  href="https://github.com/MohammadSeyedabadi"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("descEleven")}
                </a>{" "}
                {t("descTwelve")}{" "}
                <a
                  href="https://www.linkedin.com/in/mohammad-seyedabadi-397a61256/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("descThirteen")}
                </a>{" "}
                {t("descFourteen")} {t("descFifteen")}{" "}
                <strong>
                  <u>mhmd.sey.7</u>
                </strong>{" "}
                at{" "}
                <strong>
                  <u>gmail.com</u>
                </strong>
              </p>
            </div>
          </section>
        </div>
        <aside className="post-sidebar">
          <div className="post-sidebar-card" style={{ width: "fit-content" }}>
            <h2>{t("me")}</h2>
            <img src="/images/me.jpg" alt="me" />
          </div>
        </aside>
      </div>
    </div>
  );
}
