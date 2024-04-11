import config from "@/utils/config";
import { getAllPosts } from "@/utils/posts-util";
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
        fa: `/fa/tags/${tag}`,
      },
    },
  };
}

export default async function tag({ params }) {
  const allPosts = await getData();
  const { locale, tag } = params;
  let tagName;
  const tagPosts = allPosts
    .filter((post) => {
      if (locale == post.lang) {
        for (let postTagInfo of post.tags) {
          if (postTagInfo.slug == tag) {
            if (!tagName) {
              tagName = postTagInfo.name;
            }
            return true;
          }
        }
      }
    })
    .map((post) => {
      return <Post key={post.title} post={post} />;
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
        <div className="sidebar-content">{/* <BlogSidebar /> */}</div>
      </div>
    </section>
  );
}

export async function getData() {
  const allPosts = getAllPosts();

  return allPosts;
}
