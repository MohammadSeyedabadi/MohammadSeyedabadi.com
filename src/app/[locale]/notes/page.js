import { Link } from "@/navigation";
import clientPromise from "@/utils/mongodb";
import Hero from "@/components/Hero";

export default async function page({ params }) {
  const { locale } = params;
  const allPostsPreviewData = await getAllNotesPreviewData(locale);

  return (
    <section className="container markdown-content">
      <div className="grid">
        <div className="article-content">
          <Hero title={locale === "fa" ? "نوشته ها" : "Notes"} />
          <section className="segment">
            <div className="posts">
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
                  <Link key={slug} href={`/${slug}`} className="post">
                    <h3>{title}</h3>
                    <time>{formattedDate}</time>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
        <div className="sidebar-content">
          {/* <BlogSidebar params={params} /> */}
        </div>
      </div>
    </section>
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
    console.error(e);
    return [];
    // return {
    //   props: { allNotesTitle: [] },
    // };
  }
}
