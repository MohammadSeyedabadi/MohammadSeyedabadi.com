"use client";
import { projectsList } from "@/data/projectsList";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import ExternalLinkIcon from "@/assets/ExternalLinkIcon";

export default function ProjectPreview() {
  const lang = useParams().locale;
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {projectsList
        .filter((project) => project.highlight)
        .map((project) => {
          return (
            <div
              className="relative break-all px-4 pt-4 pb-14 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 dark:bg-neutral-800 dark:border-neutral-500"
              key={project.slug}
            >
              <div>
                <time className="text-neutral-500 dark:text-neutral-300 block text-sm">
                  {lang === "en" ? project.enDate : project.faDate}
                </time>
                <a
                  className="text-lg hover:underline inline-block active:scale-95 text-indigo-500 dark:text-indigo-300"
                  href={`https://github.com/MohammadSeyedabadi/${project.slug}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {project.name}
                </a>
                <p className="text-base text-neutral-500 dark:text-neutral-300">
                  {lang === "en" ? project.enDesc : project.faDesc}
                </p>
              </div>
              <div className="absolute bottom-3 flex gap-5">
                {project.writeup && (
                  <Link
                    className="flex gap-1 items-center text-sm font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 active:scale-95 hover:border-indigo-500 hover:dark:border-indigo-300"
                    href={project.writeup}
                  >
                    {lang === "en" ? "Article" : "مقاله"}
                  </Link>
                )}
                {project.url && (
                  <a
                    className="flex gap-1 items-center text-sm font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 active:scale-95 hover:border-indigo-500 hover:dark:border-indigo-300"
                    target="_blank"
                    rel="noreferrer"
                    href={project.url}
                  >
                    {lang === "en" ? "Demo" : "نمونه نمایشی"}{" "}
                    <ExternalLinkIcon />
                  </a>
                )}
                <a
                  className="flex gap-1 items-center text-sm font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 active:scale-95 hover:border-indigo-500 hover:dark:border-indigo-300"
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
