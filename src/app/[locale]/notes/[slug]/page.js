export default async function page({params}) {
  const data = await getData(params.slug);
  
  return (
    <div>
      <div>{data?.desc}</div>
    </div>
  );
}

const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};
