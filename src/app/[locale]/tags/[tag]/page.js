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
  };
}
