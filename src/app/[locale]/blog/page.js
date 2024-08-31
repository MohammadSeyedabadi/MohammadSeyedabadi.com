import config from "@/utils/config";
import { getAllPostsMetaData } from "@/utils/posts-util";
import BlogSidebar from "@/components/BlogSidebar";
import Hero from "@/components/Hero";
import Post from "@/components/Post";

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
  let allPostsPreviewData;
  try {
    allPostsPreviewData = await getAllPostsMetaData(params.locale);
  } catch (error) {
    console.error(
      `Failed To Fetch All Posts Meta Data In /blog/page.js. Error Message : ${error}`
    );
  }
  return (
    <section className="container markdown-content">
      <div className="grid">
        <div className="article-content">
          <Hero title={params.locale === "fa" ? "نوشته ها" : "Writing"} />
          <section className="segment">
            <div className="posts">
              {allPostsPreviewData.map((eachPostPreviewData) => {
                return (
                  <Post
                    key={eachPostPreviewData.title}
                    eachPostPreviewData={eachPostPreviewData}
                    page="blog"
                  />
                );
              })}
            </div>
          </section>
        </div>
        <div className="sidebar-content">
          {/* <BlogSidebar params={params} /> */}
        </div>
      </div>
    </section>
  );
}
