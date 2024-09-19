import Hero from "@/components/Hero";
import Post from "@/components/Post";
import clientPromise from "@/utils/mongodb";
import Writings from "../Writings";

export default async function page({ params }) {
  const { locale } = params;
  const allPostsPreviewData = await getAllNotesPreviewData(locale);

  return (
    <section className="container markdown-content">
      <div className="grid">
        <div className="article-content">
          <Hero title="Writings">
            <Writings />
          </Hero>
          <section className="segment">
            <div className="posts">
              {allPostsPreviewData.map((eachPostPreviewData) => {
                return (
                  <Post
                    key={eachPostPreviewData.title}
                    eachPostPreviewData={eachPostPreviewData}
                    page="notes"
                  />
                );
              })}
            </div>
          </section>
        </div>
        <div className="sidebar-content"></div>
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
    console.error(e);
    return [];
    // return {
    //   props: { allNotesTitle: [] },
    // };
  }
}
