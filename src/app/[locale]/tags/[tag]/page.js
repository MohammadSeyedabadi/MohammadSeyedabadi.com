import config from "@/utils/config";
import { getAllPostsMetaData } from "@/utils/posts-util";
import Post from "@/components/Post";
import Hero from "@/components/Hero";

export async function generateMetadata({ params }) {
  const { locale, tag } = params;

  return {
    title: `${tag} | ${
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
  console.log(params)
  let allPostsMetaData;
  try {
    allPostsMetaData = await getAllPostsMetaData(params.locale);
  } catch (error) {
    console.error(
      `Failed To Fetch All Posts Meta Data In /tags/[tag]/page.js. Error Message : ${error}`
    );
  }
  const { locale, tag } = params;
  let tagName;
  const tagPosts = allPostsMetaData
    .filter((eachPostMetaData) => {
      if (locale == eachPostMetaData.lang) {
        for (let postTagInfo of eachPostMetaData.tags) {
          if (postTagInfo.slug == tag) {
            if (!tagName) {
              tagName = postTagInfo.name;
            }
            return true;
          }
        }
      }
    })
    .map((eachPostMetaData) => {
      return (
        <Post
          key={eachPostMetaData.title}
          eachPostPreviewData={eachPostMetaData}
        />
      );
    });

  return (
    <section className="container markdown-content">
      <div className="grid">
        <div className="article-content">
          <Hero
            subTitle={locale == "en" ? " posts tagged:" : " پست شامل تگ:"}
            highlight={tagPosts.length}
            title={tagName}
          />
          <div className="segment">
            <div className="posts">{tagPosts}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
