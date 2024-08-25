import clientPromise from "../../../utils/mongodb";

export default async function page() {
  const { props: allNotesTitle } = await getData();
  console.log(allNotesTitle);
  return (
    <div>
      <div>my notes</div>
      <div></div>
    </div>
  );
}

export async function getData() {
  try {
    const client = await clientPromise;
    const db = client.db("something");
    const allNotesTitle = await db
      .collection("Post")
      .find({})
      .sort({ metacritic: -1 })
      .limit(1000)
      .toArray();

    return {
      props: { allNotesTitle: JSON.parse(JSON.stringify(allNotesTitle)) },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { allNotesTitle: [] },
    };
  }
}
