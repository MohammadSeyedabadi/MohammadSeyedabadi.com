import config from "@/utils/config";
import Posts from "@/components/Posts";
import { getAllPostsMetaData } from "@/utils/posts-util";
import BlogSidebar from "@/components/BlogSidebar";

export async function generateMetadata({ params }) {
  const { locale, slug } = params;

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
  const allPostsMetaData = await getAllPostsMetaData();
  return (
    <section className="container markdown-content">
      <div className="grid">
        <div className="article-content">
          <Posts allPostsMetaData={allPostsMetaData} />
        </div>
        <div className="sidebar-content">
          <BlogSidebar params={params} />
        </div>
      </div>
    </section>
  );
}
