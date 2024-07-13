"use client";
import { useParams } from "next/navigation";
import { useContext } from "react";
import ThemeContext from "@/store/theme-context";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import PostSidebar from "@/components/PostSidebar";
import { materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Giscus from "@giscus/react";

import TitleIcon from "@/assets/TitleIcon";

export default function ProgrammingPostTemplate({
  metaData,
  content,
  translation,
}) {
  const language = useParams().locale;
  const { ariaActive } = useContext(ThemeContext);
  const { title, slug, image } = metaData;

  const customRenderers = {
    // img(image) {       // we dont want to use the default img tag which is provided by markdown, instead we want to use img() {} method, here as a parameter we path the (image) which is a object with the image data react markdown got from the markdown text, and the alt text for example is the text between [], and we use it to use the nextJS Image.
    //   return (         // here with the img() {} method everything working well but we get an error because markdown by default put images and ... inside a p tag, we can get rid of the error with the code below, in there we check if the direct child of the p tag is an image so replace it with what we want, otherwise do nothing and return the p tag with text inside it as normal.
    //     <Image
    //       src={`/images/posts/${post.slug}/${image.src}`}
    //       alt={image.alt}
    //       width={600}
    //       height={300}
    //     />
    //   );
    // },
    h2(h2) {
      let title = h2.children.split(" ").join("-");

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
            <img
              src={`/images/posts/${slug}/${image.properties.src}`}
              alt={image.properties.alt}
              style={{ marginBottom: "20px", maxWidth: "100%" }}
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },

    code(code) {
      const { className, children } = code;
      const language = className.split("-")[1]; // className is something like language-js => We need the "js" part here
      let metaObj = {};
      if (code.node.data) {
        metaObj = JSON.parse(code.node.data.meta);
      }
      return (
        <div lang="en" dir="ltr">
          {metaObj.TITLE && <div className="code--block-header">{metaObj.TITLE}</div>}
          <SyntaxHighlighter
            style={ariaActive ? materialDark : materialLight}
            language={language}
            showLineNumbers={true}
            wrapLines={true}
            lineProps={(lineNumber) => {
              let style = { display: "block" };
              if (metaObj.ADDED?.includes(lineNumber)) {
                style.backgroundColor = "rgb(153 246 150 / 20%)";
                style.borderLeft = "5px solid rgb(153 246 150 / 50%)";
              } else if (metaObj.REMOVED?.includes(lineNumber)) {
                style.backgroundColor = "rgb(246 150 150 / 20%)";
                style.borderLeft = "5px solid rgb(246 150 150 / 50%)";
              } else if (metaObj.HIGHLIGHT?.includes(lineNumber)) {
                style.backgroundColor = "rgb(150 155 246 / 20%)";
                style.borderLeft = "5px solid rgb(150 155 246 / 50%)";
              }

              return { style };
            }}
          >
            {children}
          </SyntaxHighlighter>
        </div>
      );
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
    <>
      <div className="container">
        <div className="grid">
          <div className="article-content">
            <div className="post-header medium width">
              <div className="mobile-post-image">
                <img src={`/images/posts/${slug}/${image}`} alt={title} />
              </div>
              <h1>{title}</h1>
            </div>
            <section className="segment small">
              <div className="post-content">
                <ReactMarkdown components={customRenderers}>
                  {content}
                </ReactMarkdown>
              </div>
            </section>
            <Giscus
              id="comments"
              repo="MohammadSeyedabadi/MohammadSeyedabadi.com"
              repoId="R_kgDOKeamUQ"
              category="Announcements"
              categoryId="DIC_kwDOKeamUc4CbDQi"
              mapping="pathname"
              term="Welcome to @giscus/react component!"
              reactionsEnabled="0"
              emitMetadata="0"
              inputPosition="top"
              theme={ariaActive ? "dark" : "light"}
              lang={language}
              loading="lazy"
            />
          </div>
          <PostSidebar metaData={metaData} translation={translation} />
        </div>
      </div>
    </>
  );
}
