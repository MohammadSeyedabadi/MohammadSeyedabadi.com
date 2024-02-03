"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { projectsList } from "@/data/projectsList";
import StarIcon from "@/assets/StarIcon";
import ExternalLinkIcon from "@/assets/ExternalLinkIcon";
import { useParams } from "next/navigation";


export default function ProjectPreview() {
  const [repos, setRepos] = useState([]);
  useEffect(() => {
    async function getStars() {
      const repos = await fetch(
        "https://api.github.com/users/MohammadSeyedabadi/repos?per_page=100"
      );

      return repos.json();
    }

    getStars()
      .then((data) => {
        setRepos(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const lang = useParams().locale;

  return (
    <div className="project-preview">
      {projectsList.map((project) => {
        return (
          <div className="card anchored large" key={project.slug}>
            <div className="stars">
              {repos.find((repo) => repo.name === project.slug) && (
                <div className="star">
                  <a
                    href={`https://github.com/MohammadSeyedabadi/${project.slug}/stargazers`}
                  >
                    {Number(
                      repos.find((repo) => repo.name === project.slug)
                        .stargazers_count
                    ).toLocaleString()}
                  </a>
                  <StarIcon />
                </div>
              )}
            </div>
            <div>
              <time dir="ltr">{lang === "en" ? project.enDate : project.faDate}</time>
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
