import config from "@/utils/config";
import {
  get_all_posts_by_tag_preview_data,
  getAllTags,
} from "@/utils/posts-util";
import Post from "@/components/Post";
import Hero from "@/components/Hero";

export async function generateMetadata({ params }) {
  const { locale, tag } = params;

  return {
    title: `${locale == "en" ? tag : decodeURI(tag)} | ${
      locale == "en" ? config.enSiteTitle : config.faSiteTitle
    }`,
    description:
      locale == "en"
        ? `A list of posts tagged: ${tag}`
        : `یک لیست از پست ها شامل تگ: ${tag}`,
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
  let allTags;

  try {
    allTags = await get_all_posts_by_tag_preview_data(locale, tag);
  } catch (error) {
    console.error(
      `Failed To Fetch All Posts Meta Data In /tags/[tag]/page.js. Error Message : ${error}`
    );
  }

  return (
    <section className="container markdown-content">
      <div className="grid">
        <div className="article-content">
          <Hero
            subTitle={locale == "en" ? " posts tagged:" : " پست شامل تگ:"}
            highlight={allTags.length}
            title={tag}
          />
          <div className="segment">
            <div className="posts">
              {allTags.map((eachPostPreviewData) => {
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
