import { sql } from "@/data/data";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { TagsSkeleton } from "@/components/skeletons";
import { Link } from "@/i18n/routing";

export async function generateStaticParams() {
  const locales = ['en', 'fa'];
  return locales.map((locale) => ({ locale }));
}

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
  const t = await getTranslations("Tags");
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8">
      <h1 className="text-5xl font-bold text-neutral-800 dark:text-neutral-100">
        {t("AllTags")}
      </h1>
      <section className="my-12 md:my-8">
        <Suspense fallback={<TagsSkeleton />}>
          <FetchTags locale={locale} />
        </Suspense>
      </section>
    </div>
  );
}

export async function FetchTags({ locale }) {
  try {
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

    return (
      <>
        {Object.keys(groupedTags)
          .sort((a, b) => a.localeCompare(b, locale, { sensitivity: "base" }))
          .map((letter) => (
            <div key={letter} className="mb-7">
              <h3 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-1">
                {letter}
              </h3>
              <ul className="flex flex-wrap items-center gap-3">
                {groupedTags[letter].map((tag) => (
                  <li key={tag} className="active:scale-95">
                    <Link
                      href={`/tags/${tag}`}
                      className="text-sm font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 hover:border-indigo-500 hover:dark:border-indigo-300"
                    >
                      {tag}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </>
    );
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch tags");
  }
}
