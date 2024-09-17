import Link from "next/link";
import clientpromise from "@/utils/mongodb";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TitleIcon from "@/assets/TitleIcon";
import PostSidebar from "@/components/PostSidebar";
import SetLang from "@/components/SetLang";

export default async function page({ params }) {
  const { locale, slug } = params;
  // const {note, otherLangNoteSlug} = await getNote(locale, slug);
  const {note, otherLangNoteSlug} = await getNote(locale, slug);
 
  const { title, image, tags, content } = note;
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
      <SetLang otherPageSlug={otherLangNoteSlug.slug} />
      <div className="grid">
        <div className="article-content">
          <div className="post-header medium width">
            <img
              src={image}
              alt={title}
              style={{ width: "80px", marginBottom: "1rem" }}
            />
            <h1>{title}</h1>
            <div className="post-sidebar" style={{ width: "fit-content" }}>
              <div className="post-sidebar-card">
                <h2>Note Details</h2>
                <ul>
                  <li>
                    <strong>Published:</strong> formattedDate
                  </li>
                  <li>
                    <strong>Last edited:</strong> formattedDate
                  </li>
                </ul>
                <h2>Tags:</h2>
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
                    Subscribe To The Newsletter
                  </a>
                </p>
              </div>
            </div>
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
        {/* <PostSidebar metaData={metaData} translation={translation} /> */}
      </div>
    </div>
  );
}

export async function getNote(locale, slug) {
  slug = locale == "en" ? slug : decodeURI(slug);
  try {
    const client = await clientpromise;
    const db = client.db("notes");
    const note = await db.collection(locale).findOne(
      { slug: slug },
      {
        projection: {
          _id: 0, // may remove for error
          slug: 0,
          lang: 0,
        },
      }
    );
    const otherLangNoteSlug = await db
      .collection(locale == "en" ? "fa" : "en")
      .findOne({ noteId: note.noteId }, { projection: { _id: 0, slug: 1 } });

    return { note, otherLangNoteSlug };
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
