import { Link } from "@/i18n/routing";
export default function Post({ eachPostPreviewData }) {
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
      href={`${page != "notes" ? `/blog/code/${slug}` : `/${slug}`}`}
      replace={page === "notes" ? true : false}
      className="post"
    >
      <h3>{title}</h3>
      <time>{formattedDate}</time>
    </Link>
  );
}
