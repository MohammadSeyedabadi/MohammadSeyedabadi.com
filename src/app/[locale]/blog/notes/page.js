import Hero from "@/components/Hero";
import Post from "@/components/Post";
import clientPromise from "@/utils/mongodb";
import Writings from "../Writings";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const blogT = await getTranslations("blog");
  const ConfigT = await getTranslations("Config");
  return {
    title: `${blogT("Writings")} | ${ConfigT("SiteTitle")}`,
    description: blogT("NotesDesc"),
    alternates: {
      languages: {
        en: "/en/blog/notes",
        fa: `/بلاگ/یادداشت-ها`,
      },
    },
  };
}

export default async function Page({ params }) {
  const { locale } = params;
  const allPostsPreviewData = await getAllNotesPreviewData(locale);
  const t = await getTranslations("blog");

  const translation = {
    Notes: t("Notes"),
    NotesDesc: t("NotesDesc"),
    CodeDesc: t("CodeDesc"),
    Code: t("Code"),
    ViewAllTags: t("ViewAllTags")
  };

  return (
    <section className="container markdown-content">
      <div className="grid">
        <div className="article-content">
          <Hero title={t("Writings")}>
            <Writings translation={translation} />
          </Hero>
          <section className="segment">
            <div className="posts">
              {allPostsPreviewData.map((eachPostPreviewData) => {
                return (
                  <Post
                    key={eachPostPreviewData.title}
                    eachPostPreviewData={eachPostPreviewData}
                    page="notes"
                  />
                );
              })}
            </div>
          </section>
        </div>
        <div className="sidebar-content"></div>
      </div>
    </section>
  );
}

export async function getAllNotesPreviewData(locale) {
  try {
    const client = await clientPromise;
    const db = client.db("notes");
    const allPostsPreviewData = await db
      .collection(locale)
      .find(
        {},
        {
          projection: {
            _id: 0, // may remove for error
            lang: 1,
            title: 1,
            slug: 1,
            createdAt: 1,
          },
        }
      )
      .toArray();

    return allPostsPreviewData;
    // return {
    //   props: { allNotesTitle: JSON.parse(JSON.stringify(allNotesTitle)) },
    // };
  } catch (e) {
    console.error(e);
    return [];
    // return {
    //   props: { allNotesTitle: [] },
    // };
  }
}
