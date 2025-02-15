import { Link } from "@/i18n/routing";
import clientpromise from "@/utils/mongodb";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TitleIcon from "@/assets/TitleIcon";
import SetLang from "@/components/SetLang";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(props) {
  const params = await props.params;
  let { locale, slug } = params;
  slug = locale == "en" ? slug : decodeURI(slug);
  const t = await getTranslations("Config");
  let note;
  try {
    const client = await clientpromise;
    const db = client.db("notes");
    note = await db.collection(locale).findOne(
      { slug: slug },
      {
        projection: {
          _id: 0, // may remove for error
          title: 1,
          excerpt: 1,
        },
      }
    );

    return {
      title: `${note.title} | ${t("SiteTitle")}`,
      description: note.excerpt,
      alternates: {
        languages: {
          en: "/en/blog/notes",
          fa: "/fa/بلاگ/یادداشت-ها",
        },
      },
    };
  } catch (e) {
    console.error(e);
  }
}

export default async function page(props) {
  const params = await props.params;
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
        <h2
          id={title}
          className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 flex items-center border-b-2 border-neutral-300 dark:border-neutral-700 mt-12 mb-4  post"
        >
          {h2.children}
          <a
            href={`#${title}`}
            aria-label={` ${h2.children} permalink`}
            className="inline-block ltr:ml-1 rtl:mr-1 rotate-45 opacity-0 hover:opacity-100"
          >
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
          className="hover:underline text-rose-500 dark:text-rose-300 inline-block active:scale-95 visited:text-indigo-500 dark:visited:text-indigo-300"
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
      <SetLang otherPageSlug={otherPageSlug} />
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
                <strong>{t("Published")}:</strong> {createdAt}
              </li>
              <li>
                <strong>{t("LastEdited")}:</strong> {lastModified}
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
                    className="font-medium py-1 px-2 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 hover:border-rose-500 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-rose-300 inline-block active:scale-95 hover:visited:border-indigo-500 hover:dark:visited:border-indigo-300"
                  >
                    {tag}
                  </Link>
                );
              })}
            </div>
            <p className="mt-5">
              <a
                href="https://mohammadseyedabadi.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base hover:underline text-rose-500 dark:text-rose-300 inline-block active:scale-95 visited:text-indigo-500 dark:visited:text-indigo-300"
              >
                {t("SubscribeToTheNewsletter")}
              </a>
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}

export async function getNote(locale, slug) {
  slug = locale == "en" ? slug : decodeURI(slug);
  await new Promise((resolve) => setTimeout(resolve, 30000));
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
