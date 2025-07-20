import { sql } from "@/data/data";
import SetLang from "@/components/SetLang";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const tags = await sql`
    SELECT en_tag AS tag, 'en' AS lang FROM tagstranslations
    UNION
    SELECT fa_tag AS tag, 'fa' AS lang FROM tagstranslations
  `;

  return tags.map((row) => ({
    locale: row.lang,
    tag: row.tag,
  }));
}

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
  // const { sortedEntries, otherPageSlug, PostCount } =
  //   await getAllNotesPreviewDataByTag(locale, tag);
  try {
    let posts, sortedPosts, otherpageslug;
    if (locale == "en") {
      posts = await sql`
                    SELECT p.title, p.slug, p.formattedcreatedatmonthday, p.year, p.otherpageslug
                    FROM enposts p
                    JOIN enpoststags pt ON pt.post_id = p.id
                    JOIN entags t ON t.id = pt.tag_id
                    WHERE t.name = ${tag}
                    ORDER BY p.createdat DESC
                    `;
      sortedPosts = sortPosts(posts, "year");
    } else {
      posts = await sql`
                    SELECT p.title, p.slug, p.faformattedcreatedatmonthday, p.fayear, p.fadigityear, p.otherpageslug
                    FROM faposts p
                    JOIN fapoststags pt ON pt.post_id = p.id
                    JOIN fatags t ON t.id = pt.tag_id
                    WHERE t.name = ${tag}
                    ORDER BY p.createdat DESC
                    `;
      sortedPosts = sortPosts(posts, "fayear");
    }

    const tagColumn = locale == "en" ? "fa_tag" : "en_tag";
    const requestedTag = locale == "en" ? "en_tag" : "fa_tag";
    otherpageslug = await sql`
                          SELECT ${sql(tagColumn)}
                          FROM tagstranslations
                          WHERE ${sql(requestedTag)} = ${tag}
                          `;

    const t = await getTranslations("Tags");
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-8 sm:grid sm:grid-cols-5">
        <SetLang
          otherPageSlug={
            locale == "en" ? otherpageslug[0].fa_tag : otherpageslug[0].en_tag
          }
        />
        <section className="sm:col-span-3">
          <header className="mb-10">
            <h1 className="text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">
              {tag}
            </h1>
            {/* <p className="text-lg text-neutral-800 dark:text-neutral-300 mb-3">
            {PostCount} {t("Post")}
            {PostCount > 1 && locale == "en" ? "s" : ""}
          </p> */}
            <Link
              href="/tags"
              className="text-lg hover:underline inline-block active:scale-95 text-indigo-500 dark:text-indigo-300"
            >
              {t("AllTagsPage")}
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
      </div>
    );
  } catch (error) {
    console.error("Database Error:", error);
    notFound();
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
