import { use } from "react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
// import Hero from "@/components/Hero";
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

export default function Projects(props) {
  const params = use(props.params);
  const t = useTranslations("Projects");
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* <Hero title={t("Projects")} /> */}
        <header className="col-span-3 text-neutral-800 dark:text-neutral-300">
          <h1 className="text-5xl dark:text-neutral-100 mb-3">
            {t("Projects")}
          </h1>
        </header>
      </div>

      <section className="my-12 md:my-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <ProjectPreview params={params} />
        </div>
      </section>
    </>
  );
}
