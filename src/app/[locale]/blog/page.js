import { sql } from "@/data/data";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export default async function Page(props) {
  const params = await props.params;
  const locale = params.locale;

  try {
    let posts, sortedPosts;
    if (locale == "en") {
      posts = await sql`SELECT id, title, slug, formattedcreatedatmonthday, year
                FROM enPosts
                ORDER BY year DESC, createdAt DESC;
                `;
      sortedPosts = sortPosts(posts, "year");
    } else {
      posts =
        await sql`SELECT id, title, slug, faformattedcreatedatmonthday, fayear, fadigityear
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
                      className="mb-4 flex items-center justify-between gap-3 font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 hover:border-rose-500 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-rose-300 active:scale-95 hover:visited:border-indigo-500 hover:dark:visited:border-indigo-300"
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
      //   <div className="md:flex md:justify-between bg-white/90 p-4 rounded md:max-h-full md:overflow-auto h-full">
      //     <div>
      //       <h1 className="text-2xl font-bold mb-6">📅 English posts</h1>

      //       {sortedPosts.map((group) => (
      //         // const formattedcreatedatmonthday = ""
      //         <section key={group.year} className="mb-8">
      //           <h2 className="text-xl font-semibold text-gray-800 mb-2">
      //             {locale == "en" ? group.year : group.posts[0].fadigityear}
      //           </h2>
      //           <ul className="space-y-1">
      //             {group.posts.map((post) => (
      //               <li key={post.slug}>
      //                 <Link
      //                   href={`/${post.title}`}
      //                   className="text-blue-600 hover:underline flex active:scale-95"
      //                 >
      //                   {locale == "en"
      //                     ? post.formattedcreatedatmonthday
      //                     : post.faformattedcreatedatmonthday}
      //                   — {post.title}
      //                 </Link>
      //               </li>
      //             ))}
      //           </ul>
      //         </section>
      //       ))}
      //     </div>
      //   </div>
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
