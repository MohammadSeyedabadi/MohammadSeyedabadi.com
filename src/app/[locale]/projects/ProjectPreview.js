import Link from "next/link";
import { projectsList } from "@/data/projectsList";
import StarIcon from "@/assets/StarIcon";
import ExternalLinkIcon from "@/assets/ExternalLinkIcon";
import { Suspense } from "react";
import Stars from "./Stars";

export default function ProjectPreview({ params }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {projectsList.map((project) => {
        return (
          <div
            className="relative break-all px-4 pt-4 pb-14 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 dark:bg-neutral-800 dark:border-neutral-500"
            key={project.slug}
          >
            <div className="flex justify-between">
              <time className="text-neutral-500 dark:text-neutral-300 block text-sm">
                {params.locale === "en" ? project.enDate : project.faDate}
              </time>
              <div key={project.slug} className="flex items-center gap-2">
                <Suspense
                  fallback={
                    <span className="relative flex h-6 w-6 rounded-full">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-300 opacity-75" />
                      <span className="relative inline-flex rounded-full h-6 w-6 bg-indigo-500 dark:bg-indigo-300" />
                    </span>
                  }
                >
                  <Stars projectsList={projectsList} locale={params.locale} />
                </Suspense>
                <StarIcon />
              </div>
            </div>
            <div>
              <a
                className="text-lg hover:underline inline-block active:scale-95 text-indigo-500 dark:text-indigo-300"
                href={`https://github.com/MohammadSeyedabadi/${project.slug}`}
                target="_blank"
                rel="noreferrer"
              >
                {project.name}
              </a>
              <p className="text-base text-neutral-500 dark:text-neutral-300">
                {params.locale === "en" ? project.enDesc : project.faDesc}
              </p>
            </div>
            <div className="absolute bottom-3 flex gap-5">
              {project.writeup && (
                <Link
                  className="flex gap-1 items-center text-sm font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 active:scale-95 hover:border-indigo-500 hover:dark:border-indigo-300"
                  href={project.writeup}
                >
                  {params.locale === "en" ? "Article" : "مقاله"}
                </Link>
              )}
              {project.url && (
                <a
                  className="flex gap-1 items-center text-sm font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 active:scale-95 hover:border-indigo-500 hover:dark:border-indigo-300"
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {params.locale === "en" ? "Demo" : "نمونه نمایشی"}{" "}
                  <ExternalLinkIcon />
                </a>
              )}
              <a
                className="flex gap-1 items-center text-sm font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 active:scale-95 hover:border-indigo-500 hover:dark:border-indigo-300"
                href={`https://github.com/MohammadSeyedabadi/${project.slug}`}
                target="_blank"
                rel="noreferrer"
              >
                {params.locale === "en" ? "Source" : "کد"} <ExternalLinkIcon />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
