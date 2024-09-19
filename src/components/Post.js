import { Link } from "@/navigation";
export default function Post({ eachPostPreviewData, page }) {
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
    <Link
      href={`${page != "notes" ? `/${page}/${slug}` : `/${slug}`}`}
      replace={page === "notes" ? true : false}
      className="post"
    >
      <h3>{title}</h3>
      <time>{formattedDate}</time>
    </Link>
  );
}
