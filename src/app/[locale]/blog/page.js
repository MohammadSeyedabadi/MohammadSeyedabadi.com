import { sql } from "@/data/data";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export async function generateMetadata() {
  const blogT = await getTranslations("blog");
  const ConfigT = await getTranslations("Config");
  return {
    title: `${blogT("Blog")} | ${ConfigT("SiteTitle")}`,
    description: blogT("BlogDesc"),
    alternates: {
      languages: {
        en: "/en/blog",
        fa: "/fa/بلاگ",
      },
    },
  };
}

export default async function Page(props) {
  const params = await props.params;
  const locale = params.locale;

  try {
    let posts, sortedPosts;
    if (locale == "en") {
      posts = await sql`
                    SELECT title, slug, formattedcreatedatmonthday, year
                    FROM enPosts
                    ORDER BY year DESC, createdAt DESC;
                    `;
      sortedPosts = sortPosts(posts, "year");
    } else {
      posts =
        await sql`
              SELECT title, slug, faformattedcreatedatmonthday, fayear, fadigityear
              FROM faPosts
              ORDER BY fayear DESC, createdAt DESC;
              `;
      sortedPosts = sortPosts(posts, "fayear");
    }

    const t = await getTranslations("blog");

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-8 sm:grid sm:grid-cols-5">
        <section className="sm:col-span-3">
          <header className="mb-10">
            <h1 className="text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">
              {t("Blog")}
            </h1>
            <Link
              href="/tags"
              className="text-lg hover:underline inline-block active:scale-95 text-indigo-500 dark:text-indigo-300"
            >
              {t("ViewAllTags")}
            </Link>
          </header>
          <section>
            {sortedPosts.map((group) => (
              <div key={group.year} className="mb-7">
                <time className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-1">
                  {locale == "en" ? group.year : group.posts[0].fadigityear}
                </time>
                <div className="text-lg">
                  {group.posts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/${post.slug}`}
                      className="mb-4 flex items-center justify-between gap-3 font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 active:scale-95 hover:border-indigo-500 hover:dark:border-indigo-300"
                    >
                      <h3 className="text-lg">{post.title}</h3>
                      <time className="hidden lg:inline font-mono">
                        {locale == "en"
                          ? post.formattedcreatedatmonthday
                          : post.faformattedcreatedatmonthday}
                      </time>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </section>
        <div className="sm:col-span-2" />
      </div>
    );
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts data.");
  }
}

function sortPosts(posts, groupBy) {
  // Group posts by year
  const grouped = posts.reduce((acc, post) => {
    const key = groupBy === "year" ? post.year : post.fayear;
    if (typeof key !== "number") {
      console.log("Skip posts without a valid year");
      return acc;
    }
    if (!acc[key]) acc[key] = []; // create year group if not exist
    acc[key].push(post); // add the post into the group
    return acc;
  }, {});

  // Turn grouped object into a sorted array
  const years = Object.entries(grouped)
    .map(([year, posts]) => ({
      year: Number(year), //Because Object.entries() always returns the keys of an object as strings, even if the original keys were numbers.
      posts,
    }))
    .sort((a, b) => b.year - a.year); // newest year first

  return years;
}
