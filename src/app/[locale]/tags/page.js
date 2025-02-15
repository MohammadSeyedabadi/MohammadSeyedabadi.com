import clientPromise from "@/utils/mongodb";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { TagsSkeleton } from "@/components/skeletons";
import ArrangeTags from "@/components/ArrangeTags";

export async function generateMetadata() {
  const t = await getTranslations("Config");
  return {
    title: `${t("Tags")} | ${t("SiteTitle")}`,
    description: t("TagsList"),
    alternates: {
      languages: {
        en: "/en/blog/notes",
        fa: "/fa/تگ-ها",
      },
    },
  };
}

export default async function page(props) {
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
          href="/blog/notes"
          className="text-lg hover:underline text-rose-500 dark:text-rose-300 inline-block active:scale-95 visited:text-indigo-500 dark:visited:text-indigo-300"
        >
          {t("NotesPage")}
        </Link>
      </p>
      <Suspense fallback={<TagsSkeleton />}>
        <FetchTags locale={locale} />
      </Suspense>
    </div>
  );
}

export async function FetchTags({ locale }) {
  try {
    const client = await clientPromise;
    const db = client.db("notes");

    let allTags = await db
      .collection(locale == "en" ? "enTags" : "faTags")
      .find({}, { projection: { _id: 0 } })
      .toArray();

    let allTagsCopy = JSON.parse(JSON.stringify(allTags[0])); // copy the value because of deleting in for loop

    for (const key in allTags[0]) {
      if (allTags[0][key].length === 0) {
        delete allTagsCopy[key];
      }
    }
    return <ArrangeTags allTags={allTagsCopy} notes={true} />;
    // return allTagsCopy;
  } catch (error) {
    throw new Error(e);
  }
}
