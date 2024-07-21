"use client";
import { useState, useEffect } from "react";

export default function Stars({ projectsList }) {
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

  return (
    <>
      {projectsList.map((project) => {
        return (
          repos.find((repo) => repo.name === project.slug) && (
            <a
              key={project.slug}
              href={`https://github.com/MohammadSeyedabadi/${project.slug}/stargazers`}
            >
              {Number(
                repos.find((repo) => repo.name === project.slug)
                  .stargazers_count
              ).toLocaleString()}
            </a>
          )
        );
      })}
    </>
  );
}
