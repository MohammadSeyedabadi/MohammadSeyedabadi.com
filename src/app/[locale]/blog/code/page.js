import Writings from "../Writings";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getAllPosts } from "@/posts/posts";

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
  const { locale } = params;
  const allCodes = getAllPosts(locale);
  const t = await getTranslations("blog");
  const translation = {
    Notes: t("Notes"),
    NotesDesc: t("NotesDesc"),
    CodeDesc: t("CodeDesc"),
    Code: t("Code"),
    ViewAllTags: t("ViewAllTags"),
  };

  const sortedEntries = sortCodes(allCodes, locale);
  // console.log(sortedEntries);

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
          {sortedEntries.map(([year, posts]) => {
            return (
              <div key={year} className="mb-7">
                <time className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-1">
                  {locale == "en" ? year : posts[0].faYear}
                </time>
                <div className="text-lg">
                  {posts.map((post) => {
                    let { local, slug, title, createdAt } = post;
                    const formattedDayMonth = new Date(
                      createdAt
                    ).toLocaleDateString(locale == "en" ? "en-US" : "fa-IR", {
                      month: "long",
                      day: "numeric",
                    });
                    createdAt = formattedDayMonth;
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
          {/* {Object.entries(allCodes).map(([key, value]) => {
            return (
              <div key={key} className="mb-7">
                <time className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-1">
                  {locale == "en" ? key : value[0].faYear}
                </time>
                <div className="text-lg">
                  {value.map((code) => {
                    const {
                      slug,
                      title,
                      formattedCreatedAtMonthDay,
                      faFormattedCreatedAtMonthDay,
                    } = code;
                    return (
                      <Link
                        key={title}
                        href={`/blog/code/${slug}`}
                        className="mb-4 flex items-center justify-between gap-3 font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 hover:border-rose-500 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-rose-300 active:scale-95 hover:visited:border-indigo-500 hover:dark:visited:border-indigo-300"
                      >
                        <h3>{title}</h3>
                        <time className="hidden lg:inline font-mono">
                          {locale == "en"
                            ? formattedCreatedAtMonthDay
                            : faFormattedCreatedAtMonthDay}
                        </time>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })} */}
        </section>
      </section>
      <div className="sm:col-span-2" />
    </div>
  );
}

function sortCodes(allCodes, locale) {
  if (locale == "en") {
    const sortedEntries = Object.entries(allCodes).sort(
      ([keyA], [keyB]) => Number(keyB) - Number(keyA)
    );
    return sortedEntries;
  } else {
    const groupedByFaYear = {};
    // Loop over each array in the original object
    Object.values(allCodes).forEach((postArray) => {
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
    return sortedEntries;
  }
}
