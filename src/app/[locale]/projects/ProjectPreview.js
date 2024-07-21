"use client";
import Link from "next/link";
import { projectsList } from "@/data/projectsList";
import StarIcon from "@/assets/StarIcon";
import ExternalLinkIcon from "@/assets/ExternalLinkIcon";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import Stars from "./Stars";
import { SkeletonTagsAndCategories } from "@/components/skeletons";

export default function ProjectPreview() {
  const lang = useParams().locale;

  return (
    <div className="project-preview">
      {projectsList.map((project) => {
        return (
          <div className="card anchored large" key={project.slug}>
            <div className="stars">
              <div key={project.slug} className="star">
                <Suspense fallback={<>Loading ...</>}>
                  <Stars projectsList={projectsList} />
                </Suspense>
                <StarIcon />
              </div>
            </div>
            <div>
              <time>{lang === "en" ? project.enDate : project.faDate}</time>
              <a
                className="card-header"
                href={`https://github.com/MohammadSeyedabadi/${project.slug}`}
                target="_blank"
                rel="noreferrer"
              >
                {project.name}
              </a>
              <p>{lang === "en" ? project.enDesc : project.faDesc}</p>
            </div>
            <div className="links anchored">
              {project.writeup && (
                <Link className="button small" href={project.writeup}>
                  {lang === "en" ? "Article" : "مقاله"}
                </Link>
              )}
              {project.url && (
                <a
                  className="button small flex"
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {lang === "en" ? "Demo" : "نمونه نمایشی"} <ExternalLinkIcon />
                </a>
              )}
              <a
                className="button small flex"
                href={`https://github.com/MohammadSeyedabadi/${project.slug}`}
                target="_blank"
                rel="noreferrer"
              >
                {lang === "en" ? "Source" : "کد"} <ExternalLinkIcon />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
