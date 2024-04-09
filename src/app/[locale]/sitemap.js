import { getAllPosts } from "@/utils/posts-util";
import { useLocale } from "next-intl";
export default async function sitemap() {
  const URLLang = useLocale();

  const baseUrl = "https://mohammadseyedabadi.com";

  const allPosts = getAllPosts();

  let postsUrl = [];
  for (let eachPost of allPosts) {
    if (eachPost.lang == URLLang) {
      postsUrl.push({
        url: `${baseUrl}/${eachPost.lang}/blog/${eachPost.slug}`,
        lastModified: eachPost.lastModified,
      });
    }
  }

  let categories = [];
  for (let eachPost of allPosts) {
    if (eachPost.lang == URLLang) {
      categories.push({
        url: `${baseUrl}/${eachPost.lang}/categories/${eachPost.category.slug}`,
        lastModified: eachPost.lastModified,
      });
    }
  }

  let tags = [];
  for (let eachPost of allPosts) {
    if (eachPost.lang == URLLang) {
      for (let eachTag of eachPost.tags) {
        tags.push({
          url: `${baseUrl}/${eachPost.lang}/tags/${eachTag.slug}`,
          lastModified: eachPost.lastModified,
        });
      }
    }
  }

  return [
    // {
    //   url: baseUrl,
    //   lastModified: new Date(),
    //   alternates: {
    //     languages: {
    //       en: `${baseUrl}/en`,
    //       fa: `${baseUrl}/fa`,
    //     },
    //   },
    // },
    {
      url: `${baseUrl}/${URLLang}`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/${URLLang}/me`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/${URLLang}/projects`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/${URLLang}/blog`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/${URLLang}/contact`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/${URLLang}/game`,
      lastModified: new Date(),
    },

    ...postsUrl,

    ...categories,

    ...tags,
  ];
}
