import Posts from "@/components/Posts";
import clientPromise from "../../../utils/mongodb";
import Hero from "@/components/Hero";

export default async function page( { params : locale }) {
  const allPostsPreviewData = await getData();
  return (
    <section className="container markdown-content">
      <div className="grid">
        <div className="article-content">
          <Hero title={locale === "fa" ? "نوشته ها" : "Notes"} />
          <Posts allPostsPreviewData={allPostsPreviewData} />
        </div>
        <div className="sidebar-content">
          {/* <BlogSidebar params={params} /> */}
        </div>
      </div>
    </section>
  );
}

export async function getData() {
  try {
    const client = await clientPromise;
    const db = client.db("something");
    const allPostsPreviewData = await db
      .collection("Post")
      .find({}, { projection: { _id: 0, content: 0, image: 0 } })
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
