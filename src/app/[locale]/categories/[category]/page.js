import config from "@/utils/config";
import { getAllPosts } from "@/utils/posts-util";
import Post from "@/components/Post";
import Hero from "@/components/Hero";

// export const metadata = {
//   title: ` | ${config.siteTitle}`,
//   description: "A list of all my posts",
// };

export async function generateMetadata({ params }) {
  const { locale, category } = params;

  return {
    title: `${locale == "en" ? category : decodeURI(category)} | ${
      locale == "en" ? config.enSiteTitle : config.faSiteTitle
    }`,
  };
}

export default async function category({ params }) {
  const allPosts = await getData();
  const { locale, category } = params;
  let categoryName;

  const categoryPosts = allPosts
    .filter((post) => {
      if (locale == post.lang && category == post.category.slug) {
        if (!categoryName) {
          categoryName = post.category.name;
        }
        return true;
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
        <div className="sidebar-content">{/* <BlogSidebar /> */}</div>
      </div>
    </section>
  );
}

export async function getData() {
  const allPosts = getAllPosts();

  return allPosts;
}
