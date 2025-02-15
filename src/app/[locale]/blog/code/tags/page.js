import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Suspense } from "react";
import { TagsSkeleton } from "@/components/skeletons";
import { getAllTags } from "@/posts/tags";
import ArrangeTags from "@/components/ArrangeTags";

export async function generateMetadata() {
  const t = await getTranslations("Config");

  return {
    title: `${t("Tags")} | ${t("SiteTitle")}`,
    description: t("TagsList"),
    alternates: {
      languages: {
        en: "/en/blog/code/tags",
        fa: "/fa/بلاگ/کد/تگ-ها",
      },
    },
  };
}

export default async function Tags(props) {
  const params = await props.params;
  const { locale } = params;

  const t = await getTranslations("Tags");
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8">
      <h1 className="text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">
        {t("AllTags")}
      </h1>
      <p className="mb-6">
        <Link
          href="/blog/code"
          className="text-lg hover:underline text-rose-500 dark:text-rose-300 inline-block active:scale-95 visited:text-indigo-500 dark:visited:text-indigo-300"
        >
          {t("CodeLinkDesc")}
        </Link>
      </p>
      <Suspense fallback={<TagsSkeleton />}>
        <FetchTags locale={locale} />
      </Suspense>
    </div>
  );
}

export async function FetchTags({ locale }) {
  const allTags = await getAllTags(locale);
  return <ArrangeTags allTags={allTags} />;
}
