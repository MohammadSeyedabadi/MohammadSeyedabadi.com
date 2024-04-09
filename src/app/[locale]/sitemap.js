import { getAllPosts } from "@/utils/posts-util";

export async function generateSitemaps() {
  return [{ id: "en" }, { id: "fa" }];
}

export default async function sitemap({ id }) {
  const baseUrl = "https://mohammadseyedabadi.com";

  const allPosts = getAllPosts();

  let postsUrl = [];
  for (let eachPost of allPosts) {
    if (id == eachPost.lang) {
      postsUrl.push({
        url: `${baseUrl}/${eachPost.lang}/blog/${eachPost.slug}`,
        lastModified: new Date(),
      });
    }
  }

  let categories = [];
  for (let eachPost of allPosts) {
    if (id == eachPost.lang) {
      categories.push({
        url: `${baseUrl}/${eachPost.lang}/categories/${eachPost.category.slug}`,
        lastModified: new Date(),
      });
    }
  }

  let tags = [];
  for (let eachPost of allPosts) {
    if (id == eachPost.lang) {
      for (let eachTag of eachPost.tags) {
        tags.push({
          url: `${baseUrl}/${eachPost.lang}/tags/${eachTag.slug}`,
          lastModified: new Date(),
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
      url: `${baseUrl}/${id}`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/${id}/me`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/${id}/projects`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/${id}/blog`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/${id}/contact`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/${id}/game`,
      lastModified: new Date(),
    },

    ...postsUrl,

    ...categories,

    ...tags,
  ];
}
