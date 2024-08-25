import clientPromise from "../../../utils/mongodb";

export default async function page() {
  const allNotesTitle = await getData();

  return <div className="container"></div>;
}

export async function getData() {
  try {
    const client = await clientPromise;
    const db = client.db("something");
    const allNotesTitle = await db
      .collection("Post")
      .find()
      .project({ title: 1, slug: 1, _id: 0 })
      .toArray();

    return allNotesTitle;
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
