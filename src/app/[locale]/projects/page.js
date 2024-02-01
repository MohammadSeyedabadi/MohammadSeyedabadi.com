import config from "@/utils/config";
import Hero from "@/components/Hero";
import ProjectPreview from "./ProjectPreview";


export const metadata = {
  title: `Projects | ${config.siteTitle}`,
  description: "A highlight of my open-source work",
};
export default function Projects() {
  return (
    <>
      <div className="container">
        <Hero title="Projects" />
      </div>

      <section className="segment">
        <div className="container">
          <ProjectPreview />
        </div>
      </section>
    </>
  );
}
