"use client";
import { useParams } from "next/navigation";
import { useContext } from "react";
import PreferencesContext from "@/store/preferences-context";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import PostSidebar from "@/components/PostSidebar";
import {
  materialLight,
  materialDark,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import Giscus from "@giscus/react";
import TitleIcon from "@/assets/TitleIcon";

export default function Post({ metaData, content, translation }) {
  const language = useParams().locale;
  const { ariaActive } = useContext(PreferencesContext);
  const { title, image: postImage } = metaData;

  const customRenderers = {
    h2(h2) {
      let title = h2.children.replace(/\s+/g, "-");

      return (
        <h2 id={title} className="">
          <a
            href={`#${title}`}
            aria-label={` ${h2.children} permalink`}
            className=""
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
                className="mb-5 max-w-full"
              />
            </a>
          </div>
        );
      }

      return (
        <p className="text-lg mb-5 text-neutral-800 dark:text-neutral-300 first-of-type:ltr:first-letter:text-[3.75rem] first-of-type:ltr:first-letter:leading-[3.5rem] first-of-type:ltr:first-letter:font-bold first-of-type:ltr:first-letter:mr-1 first-of-type:ltr:first-letter:float-left">
          {paragraph.children}
        </p>
      );
    },

    code(code) {
      const { className, children } = code;
      if (className) {
        const language = className.split("-")[1]; // className is something like language-js => We need the "js" part here
        let metaObj = {};
        if (code.node.data) {
          metaObj = JSON.parse(code.node.data.meta);
        }
        const SHOWLINENUMBERS =
          metaObj.ADDED || metaObj.REMOVED || metaObj.HIGHLIGHT;
        return (
          <div
            lang="en"
            dir="ltr"
            className={`${SHOWLINENUMBERS ? "SHOWLINENUMBERS" : null}`}
          >
            {metaObj.TITLE && (
              <div className="code--block-header">{metaObj.TITLE}</div>
            )}
            <SyntaxHighlighter
              style={ariaActive ? materialDark : materialLight}
              language={language}
              showLineNumbers={SHOWLINENUMBERS}
              wrapLines={true}
              lineProps={(lineNumber) => {
                let style = { display: "block" };
                if (metaObj.ADDED?.includes(lineNumber)) {
                  style.backgroundColor = "rgb(20 174 115 / 20%)";
                  style.borderLeft = "2.5px solid rgb(20, 174, 115)";
                } else if (metaObj.REMOVED?.includes(lineNumber)) {
                  style.backgroundColor = "rgb(243 70 70 / 20%)";
                  style.borderLeft = "2.5px solid rgb(243, 70, 70)";
                } else if (metaObj.HIGHLIGHT?.includes(lineNumber)) {
                  style.backgroundColor = "rgb(91 94 213 / 20%)";
                  style.borderLeft = "2.5px solid rgb(91, 94, 213)";
                } else {
                  // so all numbers are vertically aligned
                  style.marginLeft = "1.5px";
                }
                return { style };
              }}
            >
              {children}
            </SyntaxHighlighter>
          </div>
        );
      } else {
        return <span className="code--block-inline-code">{children}</span>;
      }
    },

    a(anchor) {
      const { node } = anchor;
      return (
        <a href={node.properties.href} target="_blank" rel="noreferrer">
          {node.children[0].value}
        </a>
      );
    },

    blockquote(blockquote) {
      const { children } = blockquote;
      return (
        <blockquote className="mb-5 p-4 dark:bg-[#7878f00d] bg-[#f1f2fd] ltr:border-l-8 rounded-xl border-2 rtl:border-r-8 border-indigo-500 dark:border-indigo-300">
          <p className="text-base text-neutral-800 dark:text-neutral-300 ltr:first-letter:text-5xl ltr:first-letter:font-bold ltr:first-letter:mr-1 ltr:first-letter:float-left">
            {blockquote.children[1].props.children}
          </p>
        </blockquote>
      );
    },
  };

  return (
    <div className="lg:grid lg:grid-cols-12 gap-24 max-w-6xl mx-auto px-4 lg:px-8">
      <div className="lg:col-span-8">
        <img src={postImage} alt={title} className="max-w-14 mb-5 lg:hidden" />
        <h1 className="text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">
          {title}
        </h1>
        <section>
          <Markdown remarkPlugins={[remarkGfm]} components={customRenderers}>
            {content}
          </Markdown>
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
      <aside className="lg:col-span-4 justify-self-center mt-8 w-full">
        <PostSidebar metaData={metaData} translation={translation} />
      </aside>
    </div>
  );
}
