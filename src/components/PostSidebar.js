"use client";
import { Link } from "@/navigation";

export default function PostSidebar({ metaData, translation }) {
  const { lang, title, slug, image, date, category, tags } = metaData;
  const formattedDate = new Date(date).toLocaleDateString(
    lang === "fa" ? "fa-IR" : "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const {
    AboutMe,
    PostSideBarDescOne,
    PostSideBarDescTwo,
    PostSideBarDescThree,
    PostDetails,
    Published,
    Category,
    Tags,
    SubscribeToTheNewsletter,
  } = translation;

  return (
    <aside className="post-sidebar">
      <div className="post-image">
        <img src={`/images/posts/${slug}/${image}`} alt={title} />
      </div>

      <div className="post-sidebar-card">
        <h2>{PostDetails}</h2>
        <ul>
          <li>
            <strong>{Published}:</strong> {formattedDate}
          </li>
          <li>
            <strong>{Category}:</strong>{" "}
            <Link href={`/categories/${category.slug}`}>{category.name}</Link>
          </li>
        </ul>

        <h2>{Tags}:</h2>
        <div className="tags">
          {tags.map((tag) => {
            return (
              <Link key={tag.name} href={`/tags/${tag.slug}`} className="tag">
                {tag.name}
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

      <div className="post-sidebar-card">
        <h2>{AboutMe}</h2>
        <p>
          {PostSideBarDescOne} <Link href="/me">{PostSideBarDescTwo}</Link>
        </p>
        <p>{PostSideBarDescThree}</p>
      </div>
    </aside>
  );
}
