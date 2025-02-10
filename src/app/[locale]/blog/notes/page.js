// import Hero from "@/components/Hero";
import clientPromise from "@/utils/mongodb";
import Writings from "../Writings";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

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
  let allPostsPreviewData;

  allPostsPreviewData = await getAllNotesPreviewData(locale);

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
          {allPostsPreviewData.map((eachPostPreviewData) => {
            const { lang, slug, title, createdAt } = eachPostPreviewData;
            const formattedDate = new Date(createdAt).toLocaleDateString(
              lang === "fa" ? "fa-IR" : "en-US",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            );
            return (
              <div className="px-2 py-1 mb-3 bg-neutral-100/45 rounded-xl border-2 border-solid border-neutral-300 dark:bg-neutral-800 dark:border-neutral-500">
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="flex items-baseline justify-between gap-3 hover:underline active:scale-95 text-indigo-500 dark:text-indigo-300 visited:text-rose-500 dark:visited:text-rose-300"
                >
                  <h3 className="text-lg">{title} asd asd asd asd asd asd asd asd asdwd </h3>
                  <time className="font-mono text-sm">
                    {formattedDate}
                  </time>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="sm:col-span-2"></div>
      </section>
    </>
  );
}

export async function getAllNotesPreviewData(locale) {
  try {
    const client = await clientPromise;
    const db = client.db("notes");
    const allPostsPreviewData = await db
      .collection(locale)
      .find(
        {},
        {
          projection: {
            _id: 0, // may remove for error
            lang: 1,
            title: 1,
            slug: 1,
            createdAt: 1,
          },
        }
      )
      .toArray();

    return allPostsPreviewData;
    // return {
    //   props: { allNotesTitle: JSON.parse(JSON.stringify(allNotesTitle)) },
    // };
  } catch (e) {
    console.error(
      e,
      "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Error in notes/page.js"
    );
    throw new Error("");

    // return [];
    // // return {
    // //   props: { allNotesTitle: [] },
    // // };
  }
}
