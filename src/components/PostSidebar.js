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
    <aside className="post-sidebar">
      <div className="post-image">
        <img src={image} alt={title} />
      </div>

      <div className="post-sidebar-card">
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
    </aside>
  );
}
