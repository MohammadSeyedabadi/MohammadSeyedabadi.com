import Hero from "@/components/Hero";
import SetLang from "@/components/SetLang";
import { Link } from "@/i18n/routing";
import clientPromise from "@/utils/mongodb";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(props) {
  const params = await props.params;
  let { locale, tag } = params;
  tag = locale == "en" ? tag : decodeURI(tag);
  const t = await getTranslations("Config");
  return {
    title: `${tag} | ${t("SiteTitle")}`,
    description: t("TagsList"),
    alternates: {
      languages: {
        en: "/en/blog/notes",
        fa: "/fa/تگ-ها",
      },
    },
  };
}

export default async function page(props) {
  const params = await props.params;
  let { locale, tag } = params;
  tag = locale == "en" ? tag : decodeURI(tag);
  const { allNotesPreviewData, otherPageSlug } =
    await getAllNotesPreviewDataByTag(locale, tag);

  return (
    <section className="container markdown-content">
      <SetLang otherPageSlug={otherPageSlug} />
      <div className="grid">
        <div className="article-content">
          <Link href="/" className="writings-link">Go To All Tags Page</Link>
          <Hero
            subTitle={locale == "en" ? " posts tagged:" : " پست شامل تگ:"}
            highlight={allNotesPreviewData.length}
            title={tag}
          />
          <div className="segment">
            <div className="posts">
              {allNotesPreviewData.map((eachPostPreviewData) => {
                const { lang, slug, title, createdAt } = eachPostPreviewData;

                const formattedDate = new Date(createdAt).toLocaleDateString(
                  lang === "fa" ? "fa-IR" : "en-US",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                );
                return (
                  <Link key={slug} href={`/${slug}`} className="post">
                    <h3>{title}</h3>
                    <time>{formattedDate}</time>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export async function getAllNotesPreviewDataByTag(locale, tag) {
  try {
    const client = await clientPromise;
    const db = client.db("notes");
    const allNotesPreviewData = await db
      .collection(locale == "en" ? "en" : "fa")
      .find(
        { tags: tag },
        {
          projection: {
            _id: 0,
            lang: 1,
            title: 1,
            slug: 1,
            otherPageSlug: 1,
            createdAt: 1,
            tags: 1,
          },
        }
      )
      .toArray();

    const firstNote = allNotesPreviewData[0];
    const tagIndex = firstNote.tags.indexOf(tag);

    const firstNoteInOtherLang = await db
      .collection(locale == "en" ? "fa" : "en")
      .find(
        { slug: firstNote.otherPageSlug },
        { projection: { _id: 0, tags: 1 } }
      )
      .toArray();

    const otherPageSlug = firstNoteInOtherLang[0].tags[tagIndex];
    return { allNotesPreviewData, otherPageSlug };
  } catch (e) {
    console.error(
      e,
      "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Error in tags/[tag]/page.js"
    );
    throw new Error(""); // good for production
  }
}
