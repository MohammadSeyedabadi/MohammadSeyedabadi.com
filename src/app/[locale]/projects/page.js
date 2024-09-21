import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/Hero";
import ProjectPreview from "./ProjectPreview";

export async function generateMetadata() {
  const t = await getTranslations("Config");

  return {
    title: `${t("Projects")} | ${t("SiteTitle")}`,
    description: t("HighLight"),
    alternates: {
      languages: {
        en: "/en/projects",
        fa: "/fa/پروژه-ها",
      },
    },
  };
}

export default function Projects({ params }) {
  const t = useTranslations("Projects");
  return (
    <>
      <div className="container">
        <Hero title={t("Projects")} />
      </div>

      <section className="segment">
        <div className="container">
          <ProjectPreview params={params} />
        </div>
      </section>
    </>
  );
}
