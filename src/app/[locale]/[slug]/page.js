import clientpromise from "@/utils/mongodb";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TitleIcon from "@/assets/TitleIcon";

export default async function page({ params }) {
  const { locale, slug } = params;
  const data = await getAllNotesPreviewData(locale);
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
      <div className="grid">
        <div className="article-content">
          <div className="post-header medium width">
            <div className="mobile-post-image">
              <img src={``} alt={title} />
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
        {/* <PostSidebar metaData={metaData} translation={translation} /> */}
      </div>
    </div>
  );
}

