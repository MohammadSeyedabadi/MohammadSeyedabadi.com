import { sql } from "@/data/data";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { TagsSkeleton } from "@/components/skeletons";
import ArrangeTags from "@/components/ArrangeTags";
import { getAllTags } from "@/posts/tags";

export async function generateMetadata() {
  const t = await getTranslations("Config");
  return {
    title: `${t("Tags")} | ${t("SiteTitle")}`,
    description: t("TagsList"),
    alternates: {
      languages: {
        en: "/en/tags",
        fa: "/fa/تگ-ها",
      },
    },
  };
}

export default async function page(props) {
  const params = await props.params;
  const { locale } = params;
  const tagTable = locale == "en" ? "entags" : "fatags";
  const tags = await sql`
  SELECT name FROM ${sql(tagTable)} ORDER BY name ASC;
`;
  const groupedTags = tags.reduce((acc, tag) => {
    const firstLetter = tag.name[0].toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(tag.name);
    return acc;
  }, {});
  const t = await getTranslations("Tags");
  return (
    // <div className="max-w-6xl mx-auto px-4 sm:px-8">
    //   <h1 className="text-5xl font-bold text-neutral-800 dark:text-neutral-100">
    //     {t("AllTags")}
    //   </h1>
    //   <section className="my-12 md:my-8">
    //     <Suspense fallback={<TagsSkeleton />}>
    //       <FetchTags locale={locale} />
    //     </Suspense>
    //   </section>
    // </div>
    <>
      {Object.keys(groupedTags)
        .sort((a, b) => a.localeCompare(b, locale, { sensitivity: "base" }))
        .map((letter) => (
          <div key={letter} className="mb-6">
            <h2 className="text-xl font-bold text-gray-700">{letter}</h2>
            <ul className="mt-2 space-y-1">
              {groupedTags[letter].map((tag) => (
                <li key={tag}>
                  <a
                    href={`/tags/${tag}`}
                    className="text-blue-600 hover:underline"
                  >
                    {tag}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </>
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

    const allTagsInLocal = await getAllTags(locale);

    const mergeObjects = (allTagsCopy, allTagsInLocal) => {
      const merged = {};

      const addWordsToMerged = (obj) => {
        for (const [key, words] of Object.entries(obj)) {
          words.forEach((word) => {
            const startingLetter = word[0].toUpperCase();
            if (!merged[startingLetter]) {
              merged[startingLetter] = [];
            }
            merged[startingLetter].push(word);
          });
        }
      };

      addWordsToMerged(allTagsCopy);
      addWordsToMerged(allTagsInLocal);

      // // Remove duplicates
      // for (const key in merged) {
      //   merged[key] = [...new Set(merged[key])];
      // }
      // return merged;
      /////////////////////////////////////////////
      // Remove duplicates and sort keys
      const sortedMerged = {};
      Object.keys(merged)
        .sort()
        .forEach((key) => {
          sortedMerged[key] = [...new Set(merged[key])];
        });

      return sortedMerged;
    };

    const mergedResult = mergeObjects(allTagsCopy, allTagsInLocal);

    return <ArrangeTags allTags={mergedResult} notes={true} />;
  } catch (e) {
    throw new Error(e);
  }
}
