import Writings from "../Writings";
import { getTranslations } from "next-intl/server";
import GetAllCodes from "./GetAllCodes";
import { Suspense } from "react";

export async function generateMetadata() {
  const blogT = await getTranslations("blog");
  const ConfigT = await getTranslations("Config");
  return {
    title: `${blogT("Writings")} | ${ConfigT("SiteTitle")}`,
    description: blogT("CodeDesc"),
    alternates: {
      languages: {
        en: "/en/blog",
        fa: "/fa/بلاگ",
      },
    },
  };
}

export default async function Blog(props) {
  const params = await props.params;
  const t = await getTranslations("blog");
  const translation = {
    Notes: t("Notes"),
    NotesDesc: t("NotesDesc"),
    CodeDesc: t("CodeDesc"),
    Code: t("Code"),
    ViewAllTags: t("ViewAllTags"),
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 sm:grid sm:grid-cols-5 items-center">
      <section className="sm:col-span-3">
        <header>
          <h1 className="text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">
            {t("Writings")}
          </h1>
          <Writings translation={translation} />
        </header>

        <section>
          <Suspense
            fallback={
              <>
                <span className="relative flex h-6 w-6 rounded-full">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-300 opacity-75" />
                  <span className="relative inline-flex rounded-full h-6 w-6 bg-indigo-500 dark:bg-indigo-300" />
                </span>
                <div className="my-4 flex flex-col gap-y-4">
                  <div className="animate-pulse h-8 bg-neutral-50 rounded-xl border-2 border-neutral-300 dark:bg-neutral-800 dark:border-neutral-500" />
                  <div className="animate-pulse h-8 bg-neutral-50 rounded-xl border-2 border-neutral-300 dark:bg-neutral-800 dark:border-neutral-500" />
                  <div className="animate-pulse h-8 bg-neutral-50 rounded-xl border-2 border-neutral-300 dark:bg-neutral-800 dark:border-neutral-500" />
                </div>
              </>
            }
          >
            <GetAllCodes locale={params.locale} />
          </Suspense>
        </section>
      </section>
      <div className="sm:col-span-2"></div>
    </div>
  );
}
