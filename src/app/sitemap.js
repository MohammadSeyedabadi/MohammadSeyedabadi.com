import { MetadataRoute } from "next";
import { getAllPosts } from "@/utils/posts-util";

export default async function sitemap() {
  const allPosts = getAllPosts();
  const postsUrl = allPosts?.map(()=>{
    return{
      key: ""
    }
  })
  return [
    {
      url: "https://acme.com",
      lastModified: new Date(),
      alternates: {
        languages: {
          es: "https://acme.com/es",
          de: "https://acme.com/de",
        },
      },
    },
    {
      url: "https://acme.com/about",
      lastModified: new Date(),
      alternates: {
        languages: {
          es: "https://acme.com/es/about",
          de: "https://acme.com/de/about",
        },
      },
    },
    {
      url: "https://acme.com/blog",
      lastModified: new Date(),
      alternates: {
        languages: {
          es: "https://acme.com/es/blog",
          de: "https://acme.com/de/blog",
        },
      },
    },
  ];
}
