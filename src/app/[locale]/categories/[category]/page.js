import config from "@/utils/config";
import Post from "@/components/Post";
import Hero from "@/components/Hero";
import { getAllPostsMetaData } from "@/utils/posts-util";

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
        fa: `/fa/categories/${category}`,
      },
    },
  };
}

export default async function category({ params }) {
  let allPostMetaData;
  try {
    allPostMetaData = await getAllPostsMetaData();
  } catch (error) {
    console.error(
      `Failed To Fetch All Posts Meta Data In /categories/[category]/page.js. Error Message : ${error}`
    );
  }
  const { locale, category } = params;
  let categoryName;

  const categoryPosts = allPostMetaData
    .filter((eachPostMetaData) => {
      if (
        locale == eachPostMetaData.lang &&
        category == eachPostMetaData.category.slug
      ) {
        if (!categoryName) {
          categoryName = eachPostMetaData.category.name;
        }
        return true;
      }
    })
    .map((eachPostMetaData) => {
      return (
        <Post
          key={eachPostMetaData.title}
          eachPostMetaData={eachPostMetaData}
        />
      );
    });

  return (
    <section className="container markdown-content">
      <div className="grid">
        <div className="article-content">
          <Hero
            subTitle={
              locale == "en"
                ? " posts categorized as:"
                : " پست دسته بندی شده با:"
            }
            highlight={categoryPosts.length}
            title={categoryName}
          />
          <div className="segment">
            <div className="posts">{categoryPosts}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
