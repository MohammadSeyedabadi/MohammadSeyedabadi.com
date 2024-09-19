import config from "@/utils/config";
import { getAllPostsMetaData, getAllTags } from "@/utils/posts-util";
import Post from "@/components/Post";
import Hero from "@/components/Hero";
import Writings from "../Writings";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = params;
  return {
    title: `${
      locale == "en"
        ? `Writing | ${config.enSiteTitle}`
        : `نوشته‌ها | ${config.faSiteTitle}`
    }`,
    description:
      locale == "en"
        ? "A list of all my posts."
        : "یک لیست از همه‌ی پست‌های من.",
    alternates: {
      languages: {
        en: "/en/blog",
        fa: "/fa/بلاگ",
      },
    },
  };
}

export default async function Blog({ params }) {
  let allPostsPreviewData, allTags;
  try {
    allTags = await getAllTags(params.locale);
    allPostsPreviewData = await getAllPostsMetaData(params.locale);
  } catch (error) {
    console.error(`Error Occurred In /blog/page.js. Error Message : ${error}`);
  }

  const t = await getTranslations("blog");
  const translation = {
    Notes: t("Notes"),
    NotesDesc: t("NotesDesc"),
    CodeDesc: t("CodeDesc"),
    Code: t("Code"),
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
                    page="blog/pc"
                  />
                );
              })}
            </div>
          </section>
        </div>
        {/* <div className="sidebar-content"></div> */}
      </div>
    </section>
  );
}
