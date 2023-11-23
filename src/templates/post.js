import { useContext } from "react";
import ThemeContext from "@/store/theme-context";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Image from "next/image";
import PostSidebar from "@/components/PostSidebar";
import { materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Giscus from "@giscus/react";

import TitleIcon from "@/assets/TitleIcon";

export default function PostTemplate({ post }) {
  const { ariaActive } = useContext(ThemeContext);
  const { title, slug, image } = post;

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
            <Image
              src={`/images/posts/${slug}/${image.properties.src}`}
              alt={image.properties.alt}
              width={600}
              height={300}
              style={{marginBottom:"20px"}}
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },

    code(code) {
      const { className, children } = code;
      const language = className.split("-")[1]; // className is something like language-js => We need the "js" part here

      return (
        <SyntaxHighlighter
          style={ariaActive ? materialDark : materialLight}
          language={language}
        >
          {children}
        </SyntaxHighlighter>
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
                <Image
                  src={`/images/posts/${slug}/${image}`}
                  width={75}
                  height={75}
                  alt={title}
                />
              </div>
              <h1>{title}</h1>
            </div>
            <section className="segment small">
              <div className="post-content">
                <ReactMarkdown components={customRenderers}>
                  {post.content}
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
              lang="en"
              loading="lazy"
            />
          </div>
          <PostSidebar post={post} />
        </div>
      </div>
    </>
  );
}
