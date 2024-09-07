import config from "@/utils/config";
import Post from "@/components/Post";
import Hero from "@/components/Hero";
import {
  get_all_posts_by_category_preview_data,
  getOtherPageSlug,
} from "@/utils/posts-util";
import SetLang from "@/components/SetLang";

export async function generateMetadata({ params }) {
  const { locale, category } = params;

  return {
    title: `${locale == "en" ? category : decodeURI(category)} | ${
      locale == "en" ? config.enSiteTitle : config.faSiteTitle
    }`,
    description:
      locale == "en"
        ? `A list of posts categorized as: ${category}`
        : `پست های دسته بندی شده با: ${category}`,
    category: category,
    alternates: {
      languages: {
        en: `/en/categories/${category}`,
        fa: `/fa/دسته-بندی-ها/${category}`,
      },
    },
  };
}

export default async function category({ params }) {
  let { locale, category } = params;
  locale == "fa" && (category = decodeURI(category));
  let all_posts_preview_data, otherPageSlug;

  try {
    all_posts_preview_data = await get_all_posts_by_category_preview_data(
      locale,
      category
    );
    otherPageSlug = await getOtherPageSlug(
      locale,
      all_posts_preview_data[0].id,
      "category"
    );
  } catch (error) {
    console.error(
      `Failed To Fetch All Posts Meta Data In /categories/[category]/page.js. Error Message : ${error}`
    );
  }

  return (
    <section className="container markdown-content">
      <SetLang otherPageSlug={otherPageSlug} />
      <div className="grid">
        <div className="article-content">
          <Hero
            subTitle={
              locale == "en"
                ? " posts categorized as:"
                : " پست دسته بندی شده با:"
            }
            highlight={all_posts_preview_data.length}
            title={category}
          />
          <div className="segment">
            <div className="posts">
              {all_posts_preview_data.map((eachPostPreviewData) => {
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
