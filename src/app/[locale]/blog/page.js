import config from "@/utils/config";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Posts from "@/components/Posts";
import { getAllPosts } from "@/utils/posts-util";

// export const metadata = {
//   title: `Writing | ${config.siteTitle}`,
//   description: "A list of all my posts",
// };

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
      canonical: "/en/blog",
      languages: {
        "en-US": "/en/blog",
        "fa-IR": "/fa/blog",
      },
    },
  };
}

export default async function Blog({ params }) {
  const allPosts = await getData();

  return (
    <>
      <SidebarLayout params={params}>
        {/* <Hero title="Writing" /> */}
        <Posts allPosts={allPosts} />
      </SidebarLayout>
    </>
  );
}

export async function getData() {
  const allPosts = getAllPosts();

  return allPosts;
}
