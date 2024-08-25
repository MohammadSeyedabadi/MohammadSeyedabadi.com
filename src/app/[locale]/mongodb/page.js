import clientPromise from "../../../utils/mongodb";

export default async function page() {
  const { props: allNotesTitle } = await getData();
  console.log(allNotesTitle);
  return (
    <div>
      <div>my notes</div>
      <div>ID : {allNotesTitle.allNotesTitle[0]._id}</div>
      <div>CREATED AT : {allNotesTitle.allNotesTitle[0].createdAt}</div>
      <div>SLUG : {allNotesTitle.allNotesTitle[0].slug}</div>
      <div>TITLE : {allNotesTitle.allNotesTitle[0].title}</div>
      <div>DESC : {allNotesTitle.allNotesTitle[0].desc}</div>
    </div>
  );
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
