import { Link } from "@/i18n/routing";

export default function PostSidebar({ metaData, translation }) {
  const { lang, title, image, createdAt, lastModified, tags } = metaData;
  const createdAtformattedDate = new Date(createdAt).toLocaleDateString(
    lang === "fa" ? "fa-IR" : "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const lastModifiedformattedDate = new Date(lastModified).toLocaleDateString(
    lang === "fa" ? "fa-IR" : "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const { PostDetails, Published, LastEdited, Tags, SubscribeToTheNewsletter } =
    translation;

  return (
    <>
      <div className="post-image">
        <img src={image} alt={title} className="max-w-36 mb-2 mx-auto" />
      </div>

      <div className="p-4 bg-neutral-100/45 rounded-xl border-2 border-solid border-neutral-300 dark:bg-neutral-800 dark:border-neutral-500">
        <h2>{PostDetails}</h2>
        <ul>
          <li>
            <strong>{Published}:</strong> {createdAtformattedDate}
          </li>
          <li>
            <strong>{LastEdited}:</strong> {lastModifiedformattedDate}
          </li>
        </ul>

        <h2>{Tags}:</h2>
        <div className="tags">
          {tags.map((tag) => {
            return (
              <Link key={tag} href={`/blog/code/tags/${tag}`} className="tag">
                {tag}
              </Link>
            );
          })}
        </div>

        <p style={{ marginTop: "2rem" }}>
          <a
            href="https://mohammadseyedabadi.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {SubscribeToTheNewsletter}
          </a>
        </p>
      </div>
    </>
  );
}
