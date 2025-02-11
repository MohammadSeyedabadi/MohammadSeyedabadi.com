import clientPromise from "@/utils/mongodb";
import { Link } from "@/i18n/routing";

export default async function GetAllNotes({ locale }) {
  let allPostsPreviewData;
  allPostsPreviewData = await getAllNotesPreviewData(locale);

  return (
    <>
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
          <div key={slug} className="mb-4">
            <Link
              href={`/${slug}`}
              className="flex items-center justify-between gap-3 font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-solid border-neutral-300 hover:border-rose-500 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-rose-300 active:scale-95 hover:visited:border-indigo-500 hover:dark:visited:border-indigo-300"
            >
              <h3 className="text-lg">{title}</h3>
              <time className="hidden lg:inline font-mono text-sm">
                {formattedDate}
              </time>
            </Link>
          </div>
        );
      })}
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
