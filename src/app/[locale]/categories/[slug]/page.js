import config from "@/utils/config";
import Posts from "@/components/Posts";
import { getAllPosts } from "@/utils/posts-util";

// export const metadata = {
//   title: ` | ${config.siteTitle}`,
//   description: "A list of all my posts",
// };

export async function generateMetadata({ params }) {
  const { locale, slug } = params;
 
  return {
    title: `${locale == "en" ? slug : decodeURI(slug)} | ${
      locale == "en" ? config.siteTitle : config.faSiteTitle
    }`,
  };
}

export default async function category({ params }) {
  const allPosts = await getData();
  const { locale, slug } = params;

  return <>{locale == "en" ? slug : decodeURI(slug)}</>;
}

export async function getData() {
  const allPosts = getAllPosts();

  return allPosts;
}
