import { getAllPostsMetaData } from "@/utils/posts-util";

export async function generateSitemaps() {
  return [{ id: "en" }, { id: "fa" }];
}

export default async function sitemap({ id }) {
  const baseUrl = "https://mohammadseyedabadi.com";

  const allPostsMetaData = await getAllPostsMetaData();

  let postsUrl = [];
  for (let eachPostMetaData of allPostsMetaData) {
    if (id == eachPostMetaData.lang) {
      postsUrl.push({
        url: `${baseUrl}/${eachPostMetaData.lang}/blog/${eachPostMetaData.slug}`,
        lastModified: new Date(),
        alternates: {
          languages: {
            en: `${baseUrl}/en/blog/${eachPostMetaData.slug}`,
            fa: `${baseUrl}/fa/blog/${eachPostMetaData.slug}`,
          },
        },
      });
    }
  }

  let categories = [];
  for (let eachPostMetaData of allPostsMetaData) {
    if (id == eachPostMetaData.lang) {
      categories.push({
        url: `${baseUrl}/${eachPostMetaData.lang}/categories/${eachPostMetaData.category.slug}`,
        lastModified: new Date(),
        alternates: {
          languages: {
            en: `${baseUrl}/en/categories/${eachPostMetaData.category.slug}`,
            fa: `${baseUrl}/fa/categories/${eachPostMetaData.category.slug}`,
          },
        },
      });
    }
  }

  let tags = [];
  for (let eachPostMetaData of allPostsMetaData) {
    if (id == eachPostMetaData.lang) {
      for (let eachTag of eachPostMetaData.tags) {
        tags.push({
          url: `${baseUrl}/${eachPostMetaData.lang}/tags/${eachTag.slug}`,
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
