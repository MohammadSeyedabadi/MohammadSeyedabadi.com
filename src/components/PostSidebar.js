"use client";
import { useContext } from "react";
import ThemeContext from "@/store/theme-context";
import Image from "next/image";
import { Link } from "@/navigation";

export default function PostSidebar({ post, translation }) {
  const { ariaActive } = useContext(ThemeContext);
  const { lang, title, slug, image, date, category, tags } = post;
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
    Newsletter,
    PostSideBarDescFour,
    SubscribeToTheNewsletter,
  } = translation;

  return (
    <aside className="post-sidebar">
      <div className="post-image">
        <Image
          src={`/images/posts/${slug}/${image}`}
          width={150}
          height={150}
          alt={title}
        />
      </div>

      <div className="post-sidebar-card">
        <h2>{AboutMe}</h2>
        <Image
          src="/images/me2.jpg"
          width={256}
          height={256}
          alt="Mohammad"
          className="sidebar-avatar"
          quality={100}
          style={ariaActive ? null : { display: "none" }}
        />
        <Image
          src="/images/me1.jpg"
          width={256}
          height={256}
          alt="Mohammad"
          className="sidebar-avatar"
          quality={100}
          style={ariaActive ? { display: "none" } : null}
        />
        <p>
          {PostSideBarDescOne} <Link href="/me">{PostSideBarDescTwo}</Link>
        </p>
        <p>{PostSideBarDescThree}</p>
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
      </div>

      <div className="post-sidebar-card" style={{ opacity: "0.5" }}>
        <h2>{Newsletter}</h2>
        <p>{PostSideBarDescFour}</p>
        <p style={{ pointerEvents: "none", cursor: "default" }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="button highlighted"
          >
            {SubscribeToTheNewsletter}
          </a>
        </p>
      </div>
    </aside>
  );
}
