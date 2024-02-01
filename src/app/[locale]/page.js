import config from "@/utils/config";
import Hero from "@/components/Hero";
import Link from "next/link";
import Image from "next/image";
import { projectsList } from "@/data/projectsList";
import Heading from "@/components/Heading";

export const metadata = {
  title: config.siteTitle,
  description: config.description,
};

export default function Index() {
  return (
    <>
      <div className="container">
        <div className="hero-wrapper">
          <Hero title="Hi, I'm Mohammad!" index>
            <p className="hero-description small width">
              Welcome to my digital garden.
              <br />
              <br />
              I'm a software developer in Neyshabur. I make{" "}
              <Link href="/projects">open-source projects</Link> and{" "}
              <Link href="/blog">write</Link> about code.
            </p>
          </Hero>
          <div className="decoration">
            <Image
              src="/images/ram.png"
              alt="RAM Ram"
              className="image hero-image"
              title="RAM Ram"
              width={440}
              height={350}
              quality={100}
            />
          </div>
        </div>
      </div>
      <div className="container">
        <section className="segment large">
          <Heading title="Projects" slug="/projects" />
          <div className="post-preview">
            {projectsList
              .filter((project) => project.highlight)
              .map((project) => {
                return (
                  <div className="anchored card" key={project.slug}>
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
                    <div className="anchored links">
                      {project.writeup && (
                        <Link className="button" href={project.writeup}>
                          Article
                        </Link>
                      )}
                      {project.url && (
                        <a
                          className="button flex"
                          target="_blank"
                          rel="noreferrer"
                          href={project.url}
                        >
                          Demo
                        </a>
                      )}
                      <a
                        className="button flex"
                        href={`https://github.com/MohammadSeyedabadi/${project.slug}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Source
                      </a>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      </div>
    </>
  );
}
