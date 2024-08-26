import config from "@/utils/config";
import Posts from "@/components/Posts";
import { getAllPostsMetaData } from "@/utils/posts-util";
import BlogSidebar from "@/components/BlogSidebar";
import Hero from "@/components/Hero";

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
        fa: "/fa/blog",
      },
    },
  };
}

export default async function Blog({ params }) {
  let allPostsMetaData;
  try {
    allPostsMetaData = await getAllPostsMetaData();
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
          <Posts allPostsPreviewData={allPostsMetaData} />
        </div>
        <div className="sidebar-content">
          <BlogSidebar params={params} />
        </div>
      </div>
    </section>
  );
}
