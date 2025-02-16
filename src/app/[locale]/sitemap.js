import { getAllTags } from "@/posts/tags";
import { getAllCodesPreviewData } from "@/utils/posts-util";
import clientPromise from "@/utils/mongodb";

export async function generateSitemaps() {
  return [{ id: "en" }, { id: "fa" }];
}

export default async function sitemap({ id }) {
  const baseUrl = "https://mohammadseyedabadi.com";
  ///////////////////////////////////////////////////////////// code notes
  const allPostsMetaData = await getAllCodesPreviewData(id);

  let codeNotesUrl = [];
  for (let eachPostMetaData of allPostsMetaData) {
    codeNotesUrl.push({
      url: `${baseUrl}/${eachPostMetaData.lang}/${
        id == "en" ? "blog" : "بلاگ"
      }/${eachPostMetaData.slug}`,
      lastModified: eachPostMetaData.lastModified,
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog/${
            id == "en" ? eachPostMetaData.slug : eachPostMetaData.otherPageSlug
          }`,
          fa: `${baseUrl}/fa/بلاگ/${
            id == "en" ? eachPostMetaData.otherPageSlug : eachPostMetaData.slug
          }`,
        },
      },
    });
  }

  const allCodeTags = getAllTags(id);
  let codeTagsPages = [];
  for (let [key, value] of Object.entries(allCodeTags)) {
    for (let eachTag of value)
      codeTagsPages.push({
        url: `${baseUrl}/${id}/${id == "en" ? "blog" : "بلاگ"}/${
          id == "en" ? "code" : "کد"
        }/${id == "en" ? "tags" : "تگ-ها"}/${eachTag}`,
        lastModified: new Date(),
        // alternates: { because there might be notes that doesnt exists in both langs and the pages are different
        //   languages: {
        //     en: `${baseUrl}/en/tags/${eachTag}`,
        //     fa: `${baseUrl}/fa/تگ-ها/${eachTag}`,
        //   },
        // },
      });
  }
  ///////////////////////////////////////////////////////////// code notes
  ///////////////////////////////////////////////////////////// general notes
  const allNotes = await getAllNotes(id);
  let allNotesInfoForSiteMap = [];

    for (let eachNote of allNotes) {
      const { slug, lastModified, otherPageSlug } = eachNote;
      const eachNoteInfo = {
        url: `${baseUrl}/${id}/${slug}`,
        lastModified: lastModified,
        alternates: {
          languages: {
            en: `${baseUrl}/en/${id == "en" ? slug : otherPageSlug}`,
            fa: `${baseUrl}/fa/${id == "en" ? otherPageSlug : slug}`,
          },
        },
      };
      allNotesInfoForSiteMap.push(eachNoteInfo);
    }
    // console.log(allNotesInfoForSiteMap);
  
  ///////////////////////////////////////////////////////////// general notes

  if (id == "en") {
    return returnEnPages(
      id,
      baseUrl,
      codeNotesUrl,
      codeTagsPages,
      allNotesInfoForSiteMap
    );
  } else {
    return returnFaPages(
      id,
      baseUrl,
      codeNotesUrl,
      codeTagsPages,
      allNotesInfoForSiteMap
    );
  }
}

function returnEnPages(
  id,
  baseUrl,
  codeNotesUrl,
  codeTagsPages,
  allNotesInfoForSiteMap
) {
  return [
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
      url: `${baseUrl}/${id}/tags`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/tags`,
          fa: `${baseUrl}/fa/تگ-ها`,
        },
      },
    },

    {
      url: `${baseUrl}/${id}/me`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/me`,
          fa: `${baseUrl}/fa/درباره-من`,
        },
      },
    },

    {
      url: `${baseUrl}/${id}/projects`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/projects`,
          fa: `${baseUrl}/fa/پروژه-ها`,
        },
      },
    },

    {
      url: `${baseUrl}/${id}/game`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/game`,
          fa: `${baseUrl}/fa/بازی`,
        },
      },
    },

    {
      url: `${baseUrl}/${id}/blog/code`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog/code`,
          fa: `${baseUrl}/fa/بلاگ/کد`,
        },
      },
    },

    {
      url: `${baseUrl}/${id}/blog/notes`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog/notes`,
          fa: `${baseUrl}/fa/بلاگ/یادداشت-ها`,
        },
      },
    },

    ...codeNotesUrl,

    ...codeTagsPages,

    ...allNotesInfoForSiteMap,
  ];
}

function returnFaPages(
  id,
  baseUrl,
  codeNotesUrl,
  codeTagsPages,
  allNotesInfoForSiteMap
) {
  return [
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
      url: `${baseUrl}/${id}/تگ-ها`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/tags`,
          fa: `${baseUrl}/fa/تگ-ها`,
        },
      },
    },

    {
      url: `${baseUrl}/${id}/درباره-من`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/me`,
          fa: `${baseUrl}/fa/درباره-من`,
        },
      },
    },

    {
      url: `${baseUrl}/${id}/پروژه-ها`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/projects`,
          fa: `${baseUrl}/fa/پروژه-ها`,
        },
      },
    },

    {
      url: `${baseUrl}/${id}/بازی`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/game`,
          fa: `${baseUrl}/fa/بازی`,
        },
      },
    },

    {
      url: `${baseUrl}/${id}/بلاگ/کد`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog/code`,
          fa: `${baseUrl}/fa/بلاگ/کد`,
        },
      },
    },

    {
      url: `${baseUrl}/${id}/بلاگ/یادداشت-ها`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog/notes`,
          fa: `${baseUrl}/fa/بلاگ/یادداشت-ها`,
        },
      },
    },

    ...codeNotesUrl,

    ...codeTagsPages,

    ...allNotesInfoForSiteMap,
  ];
}

async function getAllNotes(id) {
  try {
    const client = await clientPromise;
    const db = client.db("notes");
    const allPostsPreviewData = await db
      .collection(id)
      .find(
        {},
        {
          projection: {
            _id: 0, // may remove for error
            slug: 1,
            lastModified: 1,
            otherPageSlug: 1,
          },
        }
      )
      .toArray();

    return allPostsPreviewData;
  } catch (e) {
    console.error(e);
  }
}
