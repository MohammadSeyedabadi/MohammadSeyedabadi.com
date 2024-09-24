import clientPromise from "@/utils/mongodb";
import { Link } from "@/navigation";

export default async function page({ params }) {
  const allTags = await getAllTags(params.locale);
  // console.log(allTags);
  return (
    <div className="container">
      <div className="grid">
        <div>
          {Object.entries(allTags).map(([key, value]) => {
            return (
              <div key={key} className="alphabetical-tags">
                <h3>{key.toUpperCase()}</h3>
                <div className="tags">
                  {value.map((tag) => {
                    return (
                      <Link key={tag} href={`/tags/${tag}`} className="tag">
                        {tag}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div />
      </div>
    </div>
  );
}

export async function getAllTags(locale) {
  try {
    const client = await clientPromise;
    const db = client.db("notes");

    let allTags = await db
      .collection(locale == "en" ? "enTags" : "faTags")
      .find({}, { projection: { _id: 0 } })
      .toArray();

    let allTagsObject = JSON.parse(JSON.stringify(allTags[0])); // copy the value because of deleting in for loop

    for (const key in allTags[0]) {
      if (allTags[0][key].length === 0) {
        delete allTagsObject[key];
      }
    }
    return allTagsObject;
  } catch (error) {
    throw new Error(e);
  }
}
