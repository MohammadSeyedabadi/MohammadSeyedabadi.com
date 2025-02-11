import Writings from "../Writings";
import { getTranslations } from "next-intl/server";
import GetAllNotes from "./GetAllNotes";
import { Suspense } from "react";

export async function generateMetadata() {
  const blogT = await getTranslations("blog");
  const ConfigT = await getTranslations("Config");
  return {
    title: `${blogT("Writings")} | ${ConfigT("SiteTitle")}`,
    description: blogT("NotesDesc"),
    alternates: {
      languages: {
        en: "/en/blog/notes",
        fa: "/fa/بلاگ/یادداشت-ها",
      },
    },
  };
}

export default async function Page(props) {
  const params = await props.params;
  const { locale } = params;

  const t = await getTranslations("blog");

  const translation = {
    Notes: t("Notes"),
    NotesDesc: t("NotesDesc"),
    CodeDesc: t("CodeDesc"),
    Code: t("Code"),
    ViewAllTags: t("ViewAllTags"),
  };

  return (
    <>
      <header className="col-span-3 max-w-6xl mx-auto px-4 sm:px-8">
        <h1 className="text-5xl text-neutral-800 dark:text-neutral-100 mb-3">
          {t("Writings")}
        </h1>
        <Writings translation={translation} />
      </header>
      <section className="sm:grid sm:grid-cols-5 items-center max-w-6xl mx-auto px-4 sm:px-8">
        <div className="sm:col-span-3">
          <Suspense
            fallback={
              <>
                <span className="relative flex h-6 w-6 rounded-full">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-300 opacity-75" />
                  <span className="relative inline-flex rounded-full h-6 w-6 bg-indigo-500 dark:bg-indigo-300" />
                </span>
                <div className="my-4 flex flex-col gap-y-4">
                  <div className="animate-pulse h-8 bg-neutral-50 rounded-xl border-2 border-solid border-neutral-300 dark:bg-neutral-800 dark:border-neutral-500" />
                  <div className="animate-pulse h-8 bg-neutral-50 rounded-xl border-2 border-solid border-neutral-300 dark:bg-neutral-800 dark:border-neutral-500" />
                  <div className="animate-pulse h-8 bg-neutral-50 rounded-xl border-2 border-solid border-neutral-300 dark:bg-neutral-800 dark:border-neutral-500" />
                </div>
              </>
            }
          >
            <GetAllNotes locale={locale} />
          </Suspense>
        </div>
        <div className="sm:col-span-2"></div>
      </section>
    </>
  );
}
