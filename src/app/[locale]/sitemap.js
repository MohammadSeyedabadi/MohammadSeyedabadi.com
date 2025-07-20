import { sql } from "@/data/data";
export async function generateSitemaps() {
  return [{ id: "en" }, { id: "fa" }];
}

export default async function sitemap({ id }) {
  const baseUrl = "https://mohammadseyedabadi.com";
  let tags = await sql`
                      SELECT en_tag en_name, fa_tag fa_name
                      FROM tagstranslations
                     `;
  if (id == "en") {
    let posts = await sql`
                      SELECT slug, otherpageslug, lastModified
                      FROM enPosts
                      `;

    let postsSitemap = [],
      tagsSitemap = [];
    postsSitemap = posts.map((post) =>
      ({
        url: `${baseUrl}/en/${post.slug}`,
        lastModified: new Date(post.lastModified),
        alternates: {
          languages: {
            en: `${baseUrl}/en/${post.slug}`,
            fa: `${baseUrl}/fa/${post.otherpageslug}`,
          },
        },
      })
    );
    tagsSitemap = tags.map((tag) =>
      ({
        url: `${baseUrl}/en/${tag.en_name}`,
        lastModified: new Date(),
        alternates: {
          languages: {
            en: `${baseUrl}/en/${tag.en_name}`,
            fa: `${baseUrl}/fa/${tag.fa_name}`,
          },
        },
      })
    );
    return [
      {
        url: `${baseUrl}/en`,
        lastModified: new Date(),
        alternates: {
          languages: {
            en: `${baseUrl}/en`,
            fa: `${baseUrl}/fa`,
          },
        },
      },
      {
        url: `${baseUrl}/en/tags`,
        lastModified: new Date(),
        alternates: {
          languages: {
            en: `${baseUrl}/en/tags`,
            fa: `${baseUrl}/fa/تگ-ها`,
          },
        },
      },
      {
        url: `${baseUrl}/en/me`,
        lastModified: new Date(),
        alternates: {
          languages: {
            en: `${baseUrl}/en/me`,
            fa: `${baseUrl}/fa/درباره-من`,
          },
        },
      },
      {
        url: `${baseUrl}/en/projects`,
        lastModified: new Date(),
        alternates: {
          languages: {
            en: `${baseUrl}/en/projects`,
            fa: `${baseUrl}/fa/پروژه-ها`,
          },
        },
      },
      {
        url: `${baseUrl}/en/game`,
        lastModified: new Date(),
        alternates: {
          languages: {
            en: `${baseUrl}/en/game`,
            fa: `${baseUrl}/fa/بازی`,
          },
        },
      },
      ...postsSitemap,
      ...tagsSitemap,
    ];
  } else if (id == "fa") {
    let posts = await sql`
                      SELECT slug, otherpageslug, lastModified
                      FROM faPosts
                      `;

    let postsSitemap = [],
      tagsSitemap = [];
    postsSitemap = posts.map((post) =>
      ({
        url: `${baseUrl}/fa/${post.slug}`,
        lastModified: new Date(post.lastModified),
        alternates: {
          languages: {
            en: `${baseUrl}/en/${post.otherpageslug}`,
            fa: `${baseUrl}/fa/${post.slug}`,
          },
        },
      })
    );
    tagsSitemap = tags.map((tag) =>
      ({
        url: `${baseUrl}/fa/${tag.fa_name}`,
        lastModified: new Date(),
        alternates: {
          languages: {
            en: `${baseUrl}/en/${tag.en_name}`,
            fa: `${baseUrl}/fa/${tag.fa_name}`,
          },
        },
      })
    );
    return [
      {
        url: `${baseUrl}/fa`,
        lastModified: new Date(),
        alternates: {
          languages: {
            en: `${baseUrl}/en`,
            fa: `${baseUrl}/fa`,
          },
        },
      },

      {
        url: `${baseUrl}/fa/تگ-ها`,
        lastModified: new Date(),
        alternates: {
          languages: {
            en: `${baseUrl}/en/tags`,
            fa: `${baseUrl}/fa/تگ-ها`,
          },
        },
      },

      {
        url: `${baseUrl}/fa/درباره-من`,
        lastModified: new Date(),
        alternates: {
          languages: {
            en: `${baseUrl}/en/me`,
            fa: `${baseUrl}/fa/درباره-من`,
          },
        },
      },

      {
        url: `${baseUrl}/fa/پروژه-ها`,
        lastModified: new Date(),
        alternates: {
          languages: {
            en: `${baseUrl}/en/projects`,
            fa: `${baseUrl}/fa/پروژه-ها`,
          },
        },
      },

      {
        url: `${baseUrl}/fa/بازی`,
        lastModified: new Date(),
        alternates: {
          languages: {
            en: `${baseUrl}/en/game`,
            fa: `${baseUrl}/fa/بازی`,
          },
        },
      },

      ...postsSitemap,
      ...tagsSitemap,
    ];
  }
}
