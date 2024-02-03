import { useTranslations } from "next-intl";
import config from "@/utils/config";
import Hero from "@/components/Hero";
import ProjectPreview from "./ProjectPreview";

export const metadata = {
  title: `Projects | ${config.siteTitle}`,
  description: "A highlight of my open-source work",
};
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
