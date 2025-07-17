"use client"
import { useContext } from "react";
import PreferencesContext from "@/store/preferences-context";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialLight,
  materialDark,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import TitleIcon from "@/assets/TitleIcon";

export default function Content({ content }) {
  const { ariaActive } = useContext(PreferencesContext);
  const customRenderers = {
    h2(h2) {
      let title = h2.children.replace(/\s+/g, "-");

      return (
        <h2
          id={title}
          className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 border-b-2 border-neutral-300 dark:border-neutral-700 mt-12 mb-4"
        >
          <a
            href={`#${title}`}
            aria-label={`${h2.children} permalink`}
            className="flex items-center hover:text-indigo-500 dark:hover:text-indigo-300 post"
          >
            <p>{h2.children}</p>
            <TitleIcon />
          </a>
        </h2>
      );
    },

    h3(h3) {
      let title = h3.children.replace(/\s+/g, "-");

      return (
        <h3
          id={title}
          className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 border-b-2 border-neutral-300 dark:border-neutral-700 mt-12 mb-4"
        >
          <a
            href={`#${title}`}
            aria-label={`${h3.children} permalink`}
            className="flex items-center hover:text-indigo-500 dark:hover:text-indigo-300 post"
          >
            <p>{h3.children}</p>
            <TitleIcon />
          </a>
        </h3>
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
        <a
          href={node.properties.href}
          target="_blank"
          rel="noreferrer"
          className="hover:underline inline-block active:scale-95 text-indigo-500 dark:text-indigo-300"
        >
          {node.children[0].value}
        </a>
      );
    },

    blockquote(blockquote) {
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
    <section>
      <Markdown remarkPlugins={[remarkGfm]} components={customRenderers}>
        {content}
      </Markdown>
    </section>
  );
}
