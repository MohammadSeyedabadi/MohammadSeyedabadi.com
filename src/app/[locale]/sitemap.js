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
        alternates: {
          languages: {
            en: `${baseUrl}/en/blog/${eachPost.slug}`,
            fa: `${baseUrl}/fa/blog/${eachPost.slug}`,
          },
        },
      });
    }
  }

  let categories = [];
  for (let eachPost of allPosts) {
    if (id == eachPost.lang) {
      categories.push({
        url: `${baseUrl}/${eachPost.lang}/categories/${eachPost.category.slug}`,
        lastModified: new Date(),
        alternates: {
          languages: {
            en: `${baseUrl}/en/categories/${eachPost.category.slug}`,
            fa: `${baseUrl}/fa/categories/${eachPost.category.slug}`,
          },
        },
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
          alternates: {
            languages: {
              en: `${baseUrl}/en/tags/${eachTag.slug}`,
              fa: `${baseUrl}/fa/tags/${eachTag.slug}`,
            },
          },
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
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          fa: `${baseUrl}/fa`,
        },
      },
    },

    {
      url: `${baseUrl}/${id}/me`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/me`,
          fa: `${baseUrl}/fa/me`,
        },
      },
    },

    {
      url: `${baseUrl}/${id}/projects`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/projects`,
          fa: `${baseUrl}/fa/projects`,
        },
      },
    },

    {
      url: `${baseUrl}/${id}/blog`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog`,
          fa: `${baseUrl}/fa/blog`,
        },
      },
    },

    {
      url: `${baseUrl}/${id}/contact`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/contact`,
          fa: `${baseUrl}/fa/contact`,
        },
      },
    },

    {
      url: `${baseUrl}/${id}/game`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/game`,
          fa: `${baseUrl}/fa/game`,
        },
      },
    },

    ...postsUrl,

    ...categories,

    ...tags,
  ];
}
