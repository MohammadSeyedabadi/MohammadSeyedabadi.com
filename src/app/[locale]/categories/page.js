import config from "@/utils/config";
import { getAllPosts } from "@/utils/posts-util";

export const metadata = {
  title: `Categories | ${config.siteTitle}`,
  description: "A list of all my posts categories",
};

export default async function categories() {
  const allPosts = await getData();
  console.log(allPosts[0].lang, allPosts[0].category[1]);
  return <>ALL categories</>;
}

export async function getData() {
  const allPosts = getAllPosts();

  return allPosts;
}
