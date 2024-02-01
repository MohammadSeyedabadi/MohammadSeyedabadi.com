import config from "@/utils/config";
import TitleIcon from "@/assets/TitleIcon";
import AboutSidebar from "@/components/AboutSidebar";
import Hero from "@/components/Hero";
import Link from "next/link";

export const metadata = {
  title: `About me | ${config.siteTitle}`,
  description: `Read more about ${config.siteTitle}`,
};

export default function AboutMe() {
  return (
    <>
      <div className="container">
        <div className="grid">
          <div className="article-content">
            <Hero title="About me" />

            <section className="segment small">
              <div className="post-content">
                <p>
                  I'm Mohammad! I'm a software developer working in Neyshabur.
                  Welcome to my spot on the web for my projects, tutorials and
                  anything else I want to show the world. Check out the{" "}
                  <Link href="/projects">projects</Link> page to see a highlight
                  of my open-source work, and the <Link href="/blog">blog</Link>{" "}
                  for my tutorials and more.
                </p>
                <h2 id="work-experience" style={{ position: "relative" }}>
                  <a
                    href="#work-experience"
                    aria-label="work experience permalink"
                    className="anchor before"
                  >
                    <TitleIcon />
                  </a>
                  Work experience
                </h2>
                <p>
                  I won't bore you too much with my work history, though; that's
                  what my{" "}
                  <a
                    href="/Resume/Mohammad Seyedabadi_Front-End Developer.pdf"
                    download
                  >
                    CV
                  </a>
                  ,{" "}
                  <a
                    href="https://github.com/MohammadSeyedabadi"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Github
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://www.linkedin.com/in/mohammad-seyedabadi-397a61256/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>{" "}
                  are for.
                </p>
              </div>
            </section>
          </div>
          <AboutSidebar />
        </div>
      </div>
    </>
  );
}
