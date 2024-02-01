import { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import config from '@/@/utils/config'
import Hero from '@/@/components/Hero'
import { projectsList } from '@/@/data/projectsList'
import StarIcon from '@/@/assets/StarIcon'
import ExternalLinkIcon from '@/@/assets/ExternalLinkIcon'

export default function Projects() {
  const [repos, setRepos] = useState([])
  useEffect(() => {
    async function getStars() {
      const repos = await fetch(
        'https://api.github.com/users/MohammadSeyedabadi/repos?per_page=100'
      )

      return repos.json()
    }

    getStars()
      .then((data) => {
        setRepos(data)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <>
      <Head>
        <title>{`Projects | ${config.siteTitle}`}</title>
        <meta name="description" content="A highlight of my open-source work" />
      </Head>
      <div className="container">
        <Hero title="Projects" />
      </div>

      <section className="segment">
        <div className="container">
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
                    <time>{project.date}</time>
                    <a
                      className="card-header"
                      href={`https://github.com/MohammadSeyedabadi/${project.slug}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.name}
                    </a>
                    <p>{project.tagline}</p>
                  </div>
                  <div className="links anchored">
                    {project.writeup && (
                      <Link className="button small" href={project.writeup}>
                        Article
                      </Link>
                    )}
                    {project.url && (
                      <a
                        className="button small flex"
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Demo <ExternalLinkIcon />
                      </a>
                    )}
                    <a
                      className="button small flex"
                      href={`https://github.com/MohammadSeyedabadi/${project.slug}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Source <ExternalLinkIcon />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
