import config from "@/utils/config";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Posts from "@/components/Posts";
import { getAllPostsMetaData } from "@/utils/posts-util";

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
    <>
      <SidebarLayout params={params}>
        <Posts allPostsMetaData={allPostsMetaData} />
      </SidebarLayout>
    </>
  );
}