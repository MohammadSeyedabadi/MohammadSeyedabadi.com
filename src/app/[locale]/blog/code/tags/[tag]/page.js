import { getTranslations } from "next-intl/server";
import {
  get_all_posts_by_tag_preview_data,
  getOtherPageSlug,
} from "@/utils/posts-util";
import Post from "@/components/Post";
import Hero from "@/components/Hero";
import SetLang from "@/components/SetLang";

export async function generateMetadata({ params }) {
  const t = await getTranslations("Config");
  const { locale, tag } = params;

  return {
    title: `${locale == "en" ? tag : decodeURI(tag)} | ${t("SiteTitle")}`,
    description: `${t("Tag")} : ${tag}`,
    alternates: {
      languages: {
        en: `/en/tags/${tag}`,
        fa: `/fa/تگ-ها/${tag}`,
      },
    },
  };
}

export default async function tag({ params }) {
  let { locale, tag } = params;
  locale == "fa" && (tag = decodeURI(tag));
  let all_posts_preview_metaData, indexOfSlug, otherPageSlug;
  try {
    const data = await get_all_posts_by_tag_preview_data(locale, tag);
    all_posts_preview_metaData = data.all_posts_preview_metaData;
    indexOfSlug = data.indexOfSlug;

    otherPageSlug = await getOtherPageSlug(
      locale,
      all_posts_preview_metaData[0].id,
      indexOfSlug
    );
  } catch (error) {
    console.error(
      `Failed To Fetch All Posts Meta Data In /tags/[tag]/page.js. Error Message : ${error}`
    );
  }

  return (
    <section className="container markdown-content">
      <SetLang otherPageSlug={otherPageSlug} />
      <div className="grid">
        <div className="article-content">
          <Hero
            subTitle={locale == "en" ? " posts tagged:" : " پست شامل تگ:"}
            highlight={all_posts_preview_metaData.length}
            title={tag}
          />
          <div className="segment">
            <div className="posts">
              {all_posts_preview_metaData.map((eachPostPreviewData) => {
                return (
                  <Post
                    key={eachPostPreviewData.title}
                    eachPostPreviewData={eachPostPreviewData}
                    page="blog"
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}