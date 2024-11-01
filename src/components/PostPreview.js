"use client";
import { projectsList } from "@/data/projectsList";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import ExternalLinkIcon from "@/assets/ExternalLinkIcon";

export default function PostPreview() {
  const lang = useParams().locale;
  return (
    <div className="post-preview">
      {projectsList
        .filter((project) => project.highlight)
        .map((project) => {
          return (
            <div className="anchored card" key={project.slug}>
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
                <p>{lang === "en" ? project.enDesc :  project.faDesc }</p>
              </div>
              <div className="anchored links">
                {project.writeup && (
                  <Link className="button" href={project.writeup}>
                    {lang === "en" ? "Article" : "مقاله"}
                  </Link>
                )}
                {project.url && (
                  <a
                    className="button flex"
                    target="_blank"
                    rel="noreferrer"
                    href={project.url}
                  >
                    {lang === "en" ? "Demo" : "نمونه نمایشی"} <ExternalLinkIcon />
                  </a>
                )}
                <a
                  className="button flex"
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
