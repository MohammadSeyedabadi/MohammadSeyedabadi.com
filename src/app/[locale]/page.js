import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import config from "@/utils/config";
import Hero from "@/components/Hero";
import Heading from "@/components/Heading";
import DecorationPhoto from "@/components/DecorationPhoto";
import PostPreview from "@/components/PostPreview";

export const metadata = {
  title: config.siteTitle,
  description: config.description,
};

export default function Index() {
  const t = useTranslations("Index");
  return (
    <>
      <div className="container">
        <div className="hero-wrapper">
          <Hero title={t("descOne")} index>
            <p className="hero-description small width">
              {t("descTwo")}
              <br />
              <br />
              {t("descThree")} <Link href="/projects">{t("descFour")}</Link>{" "}
              {t("descFive")} <Link href="/blog">{t("descSix")}</Link>{" "}
              {t("descSeven")}
            </p>
          </Hero>
          <div className="decoration">
            <DecorationPhoto />
          </div>
        </div>
      </div>
      <div className="container">
        <section className="segment large">
          <Heading title={t("projects")} slug="/projects" />
          <PostPreview />
        </section>
      </div>
    </>
  );
}
