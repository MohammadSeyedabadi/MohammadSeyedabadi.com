import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import config from "@/utils/config";
import TitleIcon from "@/assets/TitleIcon";
import AboutSidebar from "@/components/AboutSidebar";
import Hero from "@/components/Hero";

// export const metadata = {
//   title: `About me | ${config.siteTitle}`,
//   description: `Read more about ${config.siteTitle}`,
// };

export async function generateMetadata({ params }) {
  const { locale, slug } = params;

  return {
    title: `${locale == "en" ? "About me" : "درباره من"} | ${
      locale == "en" ? config.enSiteTitle : config.faSiteTitle
    }`,
    description:
      locale == "en"
        ? `Read more about ${config.enSiteTitle}`
        : `درباره‌ی ${config.enSiteTitle} بیشتر بخوانید`,
  };
}

export default function AboutMe() {
  const t = useTranslations("me");
  return (
    <>
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
                  {t("descFourteen")}
                </p>
              </div>
            </section>
          </div>
          <AboutSidebar />
        </div>
      </div>
    </>
  );
}
