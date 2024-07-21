import Link from "next/link";
import { projectsList } from "@/data/projectsList";
import StarIcon from "@/assets/StarIcon";
import ExternalLinkIcon from "@/assets/ExternalLinkIcon";
import { Suspense } from "react";
import Stars from "./Stars";

export default function ProjectPreview({ params }) {

  return (
    <div className="project-preview">
      {projectsList.map((project) => {
        return (
          <div className="card anchored large" key={project.slug}>
            <div className="stars">
              <div key={project.slug} className="star">
                <Suspense fallback={<>Loading ...</>}>
                  <Stars projectsList={projectsList} locale={params.locale} />
                </Suspense>
                <StarIcon />
              </div>
            </div>
            <div>
              <time>
                {params.locale === "en" ? project.enDate : project.faDate}
              </time>
              <a
                className="card-header"
                href={`https://github.com/MohammadSeyedabadi/${project.slug}`}
                target="_blank"
                rel="noreferrer"
              >
                {project.name}
              </a>
              <p>{params.locale === "en" ? project.enDesc : project.faDesc}</p>
            </div>
            <div className="links anchored">
              {project.writeup && (
                <Link className="button small" href={project.writeup}>
                  {params.locale === "en" ? "Article" : "مقاله"}
                </Link>
              )}
              {project.url && (
                <a
                  className="button small flex"
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {params.locale === "en" ? "Demo" : "نمونه نمایشی"}{" "}
                  <ExternalLinkIcon />
                </a>
              )}
              <a
                className="button small flex"
                href={`https://github.com/MohammadSeyedabadi/${project.slug}`}
                target="_blank"
                rel="noreferrer"
              >
                {params.locale === "en" ? "Source" : "کد"} <ExternalLinkIcon />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
