import Writings from "../Writings";
import { getTranslations } from "next-intl/server";
import GetAllCodes from "./GetAllCodes";
import { Suspense } from "react";
import { PostListSkeleton } from "@/components/skeletons";

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
    <div className="max-w-6xl mx-auto px-4 sm:px-8 sm:grid sm:grid-cols-5">
      <section className="sm:col-span-3">
        <header className="mb-10">
          <h1 className="text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">
            {t("Writings")}
          </h1>
          <Writings translation={translation} />
        </header>

        <section>
          <Suspense fallback={<PostListSkeleton />}>
            <GetAllCodes locale={params.locale} />
          </Suspense>
        </section>
      </section>
      <div className="sm:col-span-2"/>
    </div>
  );
}
