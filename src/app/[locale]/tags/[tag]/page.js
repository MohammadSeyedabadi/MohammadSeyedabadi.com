import SetLang from "@/components/SetLang";
import { Link } from "@/i18n/routing";
import clientPromise from "@/utils/mongodb";
import { get_all_codes_by_tag_preview_data } from "@/utils/posts-util";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata(props) {
  const params = await props.params;
  let { locale, tag } = params;
  tag = locale == "en" ? tag : decodeURI(tag);
  const t = await getTranslations("Config");
  return {
    title: `${tag} | ${t("SiteTitle")}`,
    description: t("TagsList"),
    alternates: {
      languages: {
        en: `/en/tags/${tag}`,
        fa: `/fa/تگ-ها/${tag}`,
      },
    },
  };
}

export default async function page(props) {
  const params = await props.params;
  let { locale, tag } = params;
  tag = locale == "en" ? tag : decodeURI(tag);
  const { sortedEntries, otherPageSlug, PostCount } =
    await getAllNotesPreviewDataByTag(locale, tag);

  const t = await getTranslations("Tags");
  return (
    <>
      <SetLang otherPageSlug={otherPageSlug} />
      <header className="max-w-6xl mx-auto px-4 sm:px-8">
        <h1 className="text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">
          {tag}
        </h1>
        <p className="text-lg text-neutral-800 dark:text-neutral-300 mb-3">
          {PostCount} {t("Post")}
          {PostCount > 1 && locale == "en" ? "s" : ""}
        </p>
        <Link
          href="/tags"
          className="text-lg hover:underline text-rose-500 dark:text-rose-300 inline-block active:scale-95 visited:text-indigo-500 dark:visited:text-indigo-300"
        >
          {t("AllTagsPage")}
        </Link>
      </header>
      <section className="max-w-6xl mx-auto px-4 sm:px-8 sm:grid sm:grid-cols-5 mt-10">
        <div className="sm:col-span-3">
          {sortedEntries.map(([year, posts]) => {
            return (
              <div key={year} className="mb-7">
                <time className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-1">
                  {locale == "en" ? year : posts[0].faYear}
                </time>
                <div className="text-lg">
                  {posts.map((post) => {
                    const { local, slug, title, createdAt } = post;
                    return (
                      <Link
                        key={slug}
                        href={local ? `/blog/code/${slug}` : `/${slug}`}
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
        </div>
        <div className="sm:col-span-2" />
      </section>
    </>
  );
}

export async function getAllNotesPreviewDataByTag(locale, tag) {
  try {
    const client = await clientPromise;
    const db = client.db("notes");
    const allNotesPreviewData = await db
      .collection(locale == "en" ? "en" : "fa")
      .find(
        { tags: tag },
        {
          projection: {
            _id: 0,
            title: 1,
            slug: 1,
            otherPageSlug: 1,
            createdAt: 1,
            tags: 1,
          },
        }
      )
      .toArray();

    let otherPageSlug;

    if (allNotesPreviewData.length != 0) {
      const firstNote = allNotesPreviewData[0];
      const tagIndex = firstNote.tags.indexOf(tag);

      const firstNoteInOtherLang = await db
        .collection(locale == "en" ? "fa" : "en")
        .find(
          { slug: firstNote.otherPageSlug },
          { projection: { _id: 0, tags: 1 } }
        )
        .toArray();

      otherPageSlug = firstNoteInOtherLang[0].tags[tagIndex];
    }
    let result;
    if (otherPageSlug) {
      result = get_all_codes_by_tag_preview_data(locale, tag);
    } else {
      let data = get_all_codes_by_tag_preview_data(locale, tag, true);
      result = data.result;
      otherPageSlug = data.otherPageSlug;
    }

    for (let notePreview of allNotesPreviewData) {
      let fullYear = notePreview.createdAt.getFullYear();
      // Initialize result[year] as an array if it doesn't exist
      if (!result[fullYear]) {
        result[fullYear] = [];
      }
      // Add each post's metadata to the array for the correct year
      result[fullYear].push({ ...notePreview });
    }

    if (!result) {
      throw new Error("");
    }

    let PostCount = 0;
    for (const [key, posts] of Object.entries(result)) {
      for (const eachPost of posts) {
        PostCount++;
        if (!eachPost.local) {
          if (locale == "fa") {
            const formattedYear = new Date(
              eachPost.createdAt
            ).toLocaleDateString("fa-IR", {
              year: "numeric",
            });
            eachPost.faYear = formattedYear;
          }

          const formattedDayMonth = new Date(
            eachPost.createdAt
          ).toLocaleDateString(locale == "en" ? "en-US" : "fa-IR", {
            month: "long",
            day: "numeric",
          });
          eachPost.createdAt = formattedDayMonth;
        }
      }
    }
    // console.log(result)
    if (locale == "en") {
      const sortedEntries = Object.entries(result).sort(
        ([keyA], [keyB]) => Number(keyB) - Number(keyA)
      );

      return { sortedEntries, otherPageSlug, PostCount };
      // if(locale == "fa"){
      //
      // }
    } else {
      const groupedByFaYear = {};
      // Loop over each array in the original object
      Object.values(result).forEach((postArray) => {
        // Loop over each post in the array
        postArray.forEach((post) => {
          // Get the faYear property from the post
          const key = post.faYear;

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
      const sortedEntries = Object.entries(groupedByFaYear).sort(
        ([keyA], [keyB]) =>
          Number(convertPersianToArabicNumbers(keyB)) -
          Number(convertPersianToArabicNumbers(keyA))
      );

      // // Convert back to an object
      // const sortedGroupedByFaYear = Object.fromEntries(sortedEntries);

      // console.log(sortedGroupedByFaYear);
      // console.log(sortedEntries)
      return { sortedEntries, otherPageSlug, PostCount };
    }
  } catch (e) {
    console.error(
      e,
      "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Error in tags/[tag]/page.js"
    );
    notFound();
    // throw new Error(""); // good for production ( user )
  }
}
