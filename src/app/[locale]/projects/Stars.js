export default async function Stars({ projectsList, locale }) {
  const repos = await getRepos();
  return (
    <>
      {projectsList.map((project) => {
        return (
          repos?.find((repo) => repo.name === project.slug) && (
            <a
              key={project.slug}
              href={`https://github.com/MohammadSeyedabadi/${project.slug}/stargazers`}
              target="_blank"
              className="hover:underline text-rose-500 dark:text-rose-300 active:scale-75 visited:text-indigo-500 dark:visited:text-indigo-300"
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
  try {
    const repos = await fetch(
      "https://api.github.com/users/MohammadSeyedabadi/repos?per_page=100"
    );

    return repos.json();
  } catch (error) {
    console.error(
      `Failed To Fetch Repos In /projects/stars.js. Error Message : ${error}`
    );
    // works when no internet
    return null;
  }
}
