import { Link } from "@/navigation";
export default function Post({ eachPostMetaData }) {
  const { lang, slug, title, date } = eachPostMetaData;
  const formattedDate = new Date(date).toLocaleDateString(
    lang === "fa" ? "fa-IR" : "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <>
      <Link href={`/blog/${slug}`} className="post">
        <h3>{title}</h3>
        <time>{formattedDate}</time>
      </Link>
    </>
  );
}
