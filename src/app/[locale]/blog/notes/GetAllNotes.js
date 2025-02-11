import clientPromise from "@/utils/mongodb";
import { Link } from "@/i18n/routing";

export default async function GetAllNotes({ locale }) {
  let allNotesPreviewData;
  allNotesPreviewData = await getAllNotesPreviewData(locale);

  return (
    <>
      {allNotesPreviewData.map((eachNotePreviewData) => {
        const { slug, title, createdAt } = eachNotePreviewData;

        return (
          <div key={slug} className="mb-4">
            <Link
              href={`/${slug}`}
              className="flex items-center justify-between gap-3 font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-solid border-neutral-300 hover:border-rose-500 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-rose-300 active:scale-95 hover:visited:border-indigo-500 hover:dark:visited:border-indigo-300"
            >
              <h3 className="text-lg">{title}</h3>
              <time className="hidden lg:inline font-mono text-sm">
                {createdAt}
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
    const allNotesPreviewData = await db
      .collection(locale)
      .find(
        {},
        {
          projection: {
            _id: 0, // may remove for error
            title: 1,
            slug: 1,
            createdAt: 1,
          },
        }
      )
      .toArray();

    for (let notePreviewData of allNotesPreviewData) {
      const formattedDate = new Date(
        notePreviewData.createdAt
      ).toLocaleDateString(locale === "fa" ? "fa-IR" : "en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      notePreviewData.createdAt = formattedDate;
    }

    return allNotesPreviewData;
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
