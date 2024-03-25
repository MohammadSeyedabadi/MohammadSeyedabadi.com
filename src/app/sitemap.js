import { getAllPosts } from "@/utils/posts-util";

export default async function sitemap() {
  const baseUrl = "https://www.mohammadseyedabadi.com";

  const allPosts = getAllPosts();

  let postsUrl = [];
  for (let eachPost of allPosts) {
    postsUrl.push({
      url: `${baseUrl}/${eachPost.lang}/blog/${eachPost.slug}`,
      lastModified: eachPost.lastModified,
    });
  }

  let categories = [];
  for (let eachPost of allPosts) {
    categories.push({
      url: `${baseUrl}/${eachPost.lang}/categories/${eachPost.category.slug}`,
      lastModified: eachPost.lastModified,
    });
  }

  let tags = [];
  for (let eachPost of allPosts) {
    for (let eachTag of eachPost.tags) {
      tags.push({
        url: `${baseUrl}/${eachPost.lang}/tags/${eachTag.slug}`,
        lastModified: eachPost.lastModified,
      });
    }
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          fa: `${baseUrl}/fa`,
        },
      },
    },
    {
      url: `${baseUrl}/fa/me`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/en/me`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/en/projects`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/fa/projects`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/en/blog`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/fa/blog`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/en/contact`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/fa/contact`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/en/game`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/fa/game`,
      lastModified: new Date(),
    },
    ...postsUrl,
    ...categories,
    ...tags,
  ];
}
