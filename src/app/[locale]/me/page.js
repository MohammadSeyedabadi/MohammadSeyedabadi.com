import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import config from "@/utils/config";
import TitleIcon from "@/assets/TitleIcon";
import AboutSidebar from "@/components/AboutSidebar";
import Hero from "@/components/Hero";

export const metadata = {
  title: `About me | ${config.siteTitle}`,
  description: `Read more about ${config.siteTitle}`,
};

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
                  Work experience
                </h2>
                <p>
                  I won't bore you too much with my work history, though; that's
                  what my{" "}
                  <a
                    href="/Resume/Mohammad Seyedabadi_Front-End Developer.pdf"
                    download
                  >
                    CV
                  </a>
                  ,{" "}
                  <a
                    href="https://github.com/MohammadSeyedabadi"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Github
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://www.linkedin.com/in/mohammad-seyedabadi-397a61256/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>{" "}
                  are for.
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
