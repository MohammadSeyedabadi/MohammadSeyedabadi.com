import { sql } from "@/data/data";
import { Link } from "@/i18n/routing";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TitleIcon from "@/assets/TitleIcon";
import SetLang from "@/components/SetLang";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata(props) {
  const params = await props.params;
  let { locale, slug } = params;
  slug = locale == "en" ? slug : decodeURI(slug);
  const t = await getTranslations("Config");
  const postTable = locale === "en" ? "enposts" : "faposts";

  try {
    const post = await sql`
    SELECT title, excerpt FROM ${sql(postTable)} WHERE slug = ${slug};
  `;

    if (!post[0]) {
      notFound();
    }

    const { title, excerpt } = post[0];

    return {
      title: `${title} | ${t("SiteTitle")}`,
      description: excerpt,
      alternates: {
        languages: {
          en: `/en/${title}`,
          fa: `/fa/${title}`,
        },
      },
    };
  } catch (error) {
    console.error(error);
    notFound();
  }
}

export default async function Page(props) {
  const params = await props.params;
  let { locale, slug } = params;
  slug = locale == "fa" ? decodeURI(slug) : slug;
  const { post, tags } = await getPostWithTags(slug, locale);
  const t = await getTranslations("notes");

  const {
    title,
    otherpageslug,
    formattedcreatedat,
    faformattedcreatedat,
    formattedlastmodified,
    faformattedlastmodified,
    image,
    content,
  } = post;
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
    <>
      <SetLang otherPageSlug={otherpageslug} />
      <div className="lg:grid lg:grid-cols-12 gap-24 max-w-6xl mx-auto px-4 lg:px-8">
        <div className="lg:col-span-8">
          <img src={image} alt={title} className="max-w-14 mb-5 lg:hidden" />

          <h1 className="text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">
            {title}
          </h1>
          <section>
            <Markdown remarkPlugins={[remarkGfm]} components={customRenderers}>
              {content}
            </Markdown>
          </section>
        </div>
        <aside className="lg:col-span-4 justify-self-center mt-8 w-full">
          <div>
            <img src={image} alt={title} className="max-w-36 mb-2 mx-auto" />
          </div>
          <div className="p-6 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 dark:bg-neutral-800 dark:border-neutral-500">
            <h2 className="text-base uppercase font-bold text-neutral-800 dark:text-neutral-100">
              {t("NoteDetails")}
            </h2>
            <ul className="mb-3 list-disc list-outside ms-5 text-sm text-neutral-800 dark:text-neutral-300">
              <li>
                <strong>{t("Published")}:</strong>{" "}
                {locale == "en" ? formattedcreatedat : faformattedcreatedat}
              </li>
              <li>
                <strong>{t("LastEdited")}:</strong>{" "}
                {locale == "en"
                  ? formattedlastmodified
                  : faformattedlastmodified}
              </li>
            </ul>
            <h2 className="text-base uppercase font-bold text-neutral-800 dark:text-neutral-100">
              {t("Tags")}:
            </h2>
            <div className="flex items-center gap-x-1 gap-y-2 flex-wrap ps-0 list-none text-xs">
              {tags.map((tag) => {
                return (
                  <Link
                    key={tag}
                    href={`/tags/${tag}`}
                    className="font-medium py-1 px-2 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 inline-block active:scale-95 hover:border-indigo-500 hover:dark:border-indigo-300"
                  >
                    {tag}
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export async function getPostWithTags(postSlug, locale) {
  const postTable = locale === "en" ? "enposts" : "faposts";
  const tagTable = locale === "en" ? "entags" : "fatags";
  const postTagsTable = locale === "en" ? "enpoststags" : "fapoststags";

  try {
    const post = await sql`
    SELECT id, title, otherpageslug, formattedcreatedat, faformattedcreatedat, formattedlastmodified, faformattedlastmodified, image, content FROM ${sql(
      postTable
    )} WHERE slug = ${postSlug};
  `;

    if (!post[0]) {
      notFound();
    }

    const tags = await sql`
    SELECT t.name
    FROM ${sql(tagTable)} t
    JOIN ${sql(postTagsTable)} pt ON pt.tag_id = t.id
    WHERE pt.post_id = ${post[0].id};
  `;

    return {
      post: post[0],
      tags: tags.map((tag) => tag.name),
    };
  } catch (error) {
    console.error(error);
    notFound();
  }
}
