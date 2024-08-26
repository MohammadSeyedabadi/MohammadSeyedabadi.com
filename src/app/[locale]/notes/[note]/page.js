import MarkdownComp from "./MarkdownComp";
import clientPromise from "../../../../utils/mongodb";
import { cache } from "react";

export default async function page({ params }) {
  const data = await getNote(params);
  if (!data) {
    return <>work on not found and error handling</>;
  }

  const { title, createdAt, lastModified, image, content } = data[0];
  return (
    <div className="container">
      <div className="grid">
        <div className="article-content">
          <div className="post-header medium width">
            <div className="mobile-post-image">
              {/* <img src={`/images/posts/${slug}/${image}`} alt={title} /> */}
            </div>
            <h1>{title}</h1>
          </div>
          <section className="segment small">
            <div className="post-content">
              <MarkdownComp content={content} />
            </div>
          </section>
        </div>
        {/* <PostSidebar metaData={metaData} translation={translation} /> */}
      </div>
    </div>
  );
}

export const getNote = cache(async (params) => {
  try {
    const title = params.note;
    console.log(title);
    const client = await clientPromise;
    const db = client.db("something");
    const note = await db
      .collection("Post")
      .find(
        { slug: params.note, lang: params.locale },
        { projection: { _id: 0, slug: 0, lang: 0, excerpt: 0 } }
      )
      .toArray();

    if (!note[0]) {
      console.error("There is no note with this title.");
      return false;
    }

    return note;
    // return {
    //   props: { allNotesTitle: JSON.parse(JSON.stringify(allNotesTitle)) },
    // };
  } catch (error) {
    console.error(
      `Failed To Fetch Note In /notes/[note]/page.js. Error Message : ${error}`
    );
    // return {
    //   props: { allNotesTitle: [] },
    // };
  }
  // const item = await db.item.findUnique({ title })
  // return item
});
