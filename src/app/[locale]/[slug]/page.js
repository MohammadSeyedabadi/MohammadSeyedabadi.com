import Link from "next/link";
import clientpromise from "@/utils/mongodb";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TitleIcon from "@/assets/TitleIcon";
import SetLang from "@/components/SetLang";
import { getTranslations } from "next-intl/server";

export default async function page({ params }) {
  const { locale, slug } = params;
  const note = await getNote(locale, slug);
  const t = await getTranslations("notes");

  const {
    title,
    otherPageSlug,
    createdAt,
    lastModified,
    image,
    tags,
    content,
  } = note;

  const customRenderers = {
    h2(h2) {
      let title = h2.children.replace(/\s+/g, "-");

      return (
        <h2 id={title} style={{ position: "relative" }}>
          <a
            href={`#${title}`}
            aria-label={` ${h2.children} permalink`}
            className="anchor before"
          >
            <TitleIcon />
          </a>
          {h2.children}
        </h2>
      );
    },

    p(paragraph) {
      const { node } = paragraph;

      if (node.children[0].tagName === "img") {
        const image = node.children[0];
        return (
          <div>
            <a href={image.properties.src} target="_blank">
              <img
                src={image.properties.src}
                alt={image.properties.alt}
                style={{ marginBottom: "20px", maxWidth: "100%" }}
              />
            </a>
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },

    a(anchor) {
      const { node } = anchor;
      return (
        <a href={node.properties.href} target="_blank" rel="noreferrer">
          {node.children[0].value}
        </a>
      );
    },
  };

  return (
    <div className="container">
      <SetLang otherPageSlug={otherPageSlug} />
      <div className="grid">
        <div className="article-content">
          <div className="post-header medium width">
            <div className="mobile-post-image">
              <img src={image} alt={title} />
            </div>

            <h1>{title}</h1>
          </div>
          <section className="segment small">
            <div className="post-content">
              <Markdown
                remarkPlugins={[remarkGfm]}
                components={customRenderers}
              >
                {content}
              </Markdown>
            </div>
          </section>
        </div>
        <div className="post-sidebar">
          <div className="post-image">
            <img src={image} alt={title} />
          </div>
          <div className="post-sidebar-card">
            <h2>{t("NoteDetails")}</h2>
            <ul>
              <li>
                <strong>{t("Published")}:</strong> {createdAt}
              </li>
              <li>
                <strong>{t("LastEdited")}:</strong> {lastModified}
              </li>
            </ul>
            <h2>{t("Tags")}:</h2>
            <div className="tags">
              {tags.map((tag) => {
                return (
                  <Link key={tag} href={`/tags/${tag}`} className="tag">
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
                {t("SubscribeToTheNewsletter")}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getNote(locale, slug) {
  slug = locale == "en" ? slug : decodeURI(slug);
  try {
    const client = await clientpromise;
    const db = client.db("notes");
    let note = await db.collection(locale).findOne(
      { slug: slug },
      {
        projection: {
          _id: 0, // may remove for error
          slug: 0,
          lang: 0,
        },
      }
    );

    function getFormatedDate(date) {
      const formattedDate = new Date(date).toLocaleDateString(
        locale === "fa" ? "fa-IR" : "en-US",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      );
      return formattedDate;
    }

    note.createdAt = getFormatedDate(note.createdAt);
    note.lastModified = getFormatedDate(note.lastModified);

    return note;
    // return {
    //   props: { allNotesTitle: JSON.parse(JSON.stringify(allNotesTitle)) },
    // };
  } catch (e) {
    console.error(e);
    // return {
    //   props: { allNotesTitle: [] },
    // };
  }
}
