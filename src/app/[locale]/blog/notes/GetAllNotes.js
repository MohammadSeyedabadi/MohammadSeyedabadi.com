import clientPromise from "@/utils/mongodb";
import { Link, redirect } from "@/i18n/routing";

export default async function GetAllNotes({ locale }) {
  let sortedEntries;
  sortedEntries = await getAllNotesPreviewData(locale);
  return (
    <>
      {sortedEntries.map(([year, posts]) => {
        return (
          <div key={year} className="mb-7">
            <time className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-1">
              {year}
            </time>
            <div className="text-lg">
              {posts.map((post) => {
                const { slug, title, createdAt } = post;
                return (
                  <Link
                    key={slug}
                    href={`/${slug}`}
                    className="mb-4 flex items-center justify-between gap-3 font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 hover:border-rose-500 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-rose-300 active:scale-95 hover:visited:border-indigo-500 hover:dark:visited:border-indigo-300"
                  >
                    <h3 className="text-lg">{title}</h3>
                    <time className="hidden lg:inline font-mono">
                      {createdAt}
                    </time>
                  </Link>
                );
              })}
            </div>
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

    let sortedEntries;
    if (locale == "en") {
      // same in tags > [tag] > page.js
      let result = {};
      for (let notePreviewData of allNotesPreviewData) {
        let fullYear = notePreviewData.createdAt.getFullYear();
        const formattedDate = new Date(
          notePreviewData.createdAt
        ).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
        });
        notePreviewData.createdAt = formattedDate;
        // Initialize result[year] as an array if it doesn't exist
        if (!result[fullYear]) {
          result[fullYear] = [];
        }
        // Add each post's metadata to the array for the correct year
        result[fullYear].push({ ...notePreviewData });

        sortedEntries = Object.entries(result).sort(
          ([keyA], [keyB]) => Number(keyB) - Number(keyA)
        );
      }
    } else {
      // same in tags > [tag] > page.js
      let result = {};
      for (let notePreviewData of allNotesPreviewData) {
        let fullYear = notePreviewData.createdAt.getFullYear();

        // Initialize result[year] as an array if it doesn't exist
        if (!result[fullYear]) {
          result[fullYear] = [];
        }
        // Add each post's metadata to the array for the correct year
        result[fullYear].push({ ...notePreviewData });

        //sort
        const groupedByFaYear = {};
        // Loop over each array in the original object
        Object.values(result).forEach((postArray) => {
          // Loop over each post in the array
          postArray.forEach((post) => {
            // Get the faYear property from the post
            const faYear = new Date(post.createdAt).toLocaleDateString(
              "fa-IR",
              {
                year: "numeric",
              }
            );
            const formattedDate = new Date(
              notePreviewData.createdAt
            ).toLocaleDateString("fa-IR", {
              day: "numeric",
              month: "long",
            });
            post.createdAt = formattedDate;
            const key = faYear;

            // Initialize an array at this key if it doesn't exist already
            if (!groupedByFaYear[key]) {
              groupedByFaYear[key] = [];
            }

            // Push the post into the array for its faYear
            groupedByFaYear[key].push(post);
          });
        });
        // Helper function to convert Persian numbers to Arabic numbers
        function convertPersianToArabicNumbers(persianNumber) {
          const persianDigits = "۰۱۲۳۴۵۶۷۸۹"; // Persian digits
          const arabicDigits = "0123456789"; // Arabic digits

          return persianNumber
            .split("")
            .map((char) => {
              const index = persianDigits.indexOf(char);
              return index !== -1 ? arabicDigits[index] : char;
            })
            .join("");
        }

        // Sort the entries
        sortedEntries = Object.entries(groupedByFaYear).sort(
          ([keyA], [keyB]) =>
            Number(convertPersianToArabicNumbers(keyB)) -
            Number(convertPersianToArabicNumbers(keyA))
        );
        //
      }
    }
    return sortedEntries;
    // return {
    //   props: { allNotesTitle: JSON.parse(JSON.stringify(allNotesTitle)) },
    // };
  } catch (e) {
    console.error(
      e,
      "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Error in notes/page.js"
    );
    redirect({ href: "/blog/code", locale: locale });
    // throw new Error("");

    // return [];
    // // return {
    // //   props: { allNotesTitle: [] },
    // // };
  }
}
