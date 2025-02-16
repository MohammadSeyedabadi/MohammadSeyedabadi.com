import { use } from "react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
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
    <div className="max-w-6xl mx-auto px-4 sm:px-8">
      <header className="">
        <h1 className="text-5xl font-bold text-neutral-800 dark:text-neutral-100">
          {t("Projects")}
        </h1>
      </header>
      <section className="my-12 md:my-8">
        <ProjectPreview params={params} />
      </section>
    </div>
  );
}
