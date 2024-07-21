export default async function Stars({ projectsList, locale }) {
  const repos = await getRepos();
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
              ).toLocaleString(locale === "en" ? "es-US" : "fa-IR")}
            </a>
          )
        );
      })}
    </>
  );
}

export async function getRepos() {
  const repos = await fetch(
    "https://api.github.com/users/MohammadSeyedabadi/repos?per_page=100"
  );
  return repos.json();
}
