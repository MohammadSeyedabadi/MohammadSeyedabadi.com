import { useTranslations } from "next-intl";
import config from "@/utils/config";
import Hero from "@/components/Hero";
import ProjectPreview from "./ProjectPreview";

// export const metadata = {
//   title: `Projects | ${config.siteTitle}`,
//   description: "A highlight of my open-source work",
// };

export async function generateMetadata({ params }) {
  const { locale, slug } = params;

  return {
    title: `${
      locale == "en"
        ? `Projects | ${config.enSiteTitle}`
        : `پروژه‌ها | ${config.faSiteTitle}`
    }`,
    description:
      locale == "en"
        ? "A highlight of my open-source work"
        : "یک هایلایت از پروژه‌های اپن سورس من",
    alternates: {
      canonical: "/en/projects",
      languages: {
        "en": "/en/projects",
        "fa": "/fa/projects",
      },
    },
  };
}

export default function Projects() {
  const t = useTranslations("Projects");
  return (
    <>
      <div className="container">
        <Hero title={t("Projects")} />
      </div>

      <section className="segment">
        <div className="container">
          <ProjectPreview />
        </div>
      </section>
    </>
  );
}
