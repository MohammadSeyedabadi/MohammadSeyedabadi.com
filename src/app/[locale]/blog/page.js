import config from "@/utils/config";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Posts from "@/components/Posts";
import { getAllPosts } from "@/utils/posts-util";

export const metadata = {
  title: `Writing | ${config.siteTitle}`,
  description: "A list of all my posts",
};

export default async function Blog() {
  const allPosts = await getData();
  return (
    <>
      <SidebarLayout>
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
