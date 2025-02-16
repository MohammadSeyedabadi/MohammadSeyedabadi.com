import SetLang from "@/components/SetLang";
import { Link } from "@/i18n/routing";
import clientPromise from "@/utils/mongodb";
import { get_all_codes_by_tag_preview_data } from "@/utils/posts-util";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata(props) {
  const params = await props.params;
  let { locale, tag } = params;
  tag = locale == "en" ? tag : decodeURI(tag);
  const t = await getTranslations("Config");
  return {
    title: `${tag} | ${t("SiteTitle")}`,
    description: t("TagsList"),
    alternates: {
      languages: {
        en: `/en/tags/${tag}`,
        fa: `/fa/تگ-ها/${tag}`,
      },
    },
  };
}

export default async function page(props) {
  const params = await props.params;
  let { locale, tag } = params;
  tag = locale == "en" ? tag : decodeURI(tag);
  const { postsInDBAndLocal, otherPageSlug } =
    await getAllNotesPreviewDataByTag(locale, tag);

  const PostCount = postsInDBAndLocal.length;
  const t = await getTranslations("Tags");
  return (
    <>
      <SetLang otherPageSlug={otherPageSlug} />
      <header className="max-w-6xl mx-auto px-4 sm:px-8">
        <h1 className="text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">
          {tag}
        </h1>
        <p className="text-lg text-neutral-800 dark:text-neutral-300 mb-3">
          {PostCount} {t("Post")} {PostCount > 1 && locale ? "s" : ""}
        </p>
        <Link
          href="/tags"
          className="text-lg hover:underline text-rose-500 dark:text-rose-300 inline-block active:scale-95 visited:text-indigo-500 dark:visited:text-indigo-300"
        >
          {t("AllTagsPage")}
        </Link>
      </header>
      <section className="max-w-6xl mx-auto px-4 sm:px-8 sm:grid sm:grid-cols-5 mt-10">
        <div className="sm:col-span-3">
          {postsInDBAndLocal.map((eachPostPreviewData) => {
            const { slug, title, createdAt } = eachPostPreviewData;

            return (
              <Link
                key={slug}
                href={`/${slug}`}
                className="mb-4 flex items-center justify-between gap-3 font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 hover:border-rose-500 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-rose-300 active:scale-95 hover:visited:border-indigo-500 hover:dark:visited:border-indigo-300"
              >
                <h3 className="text-lg">{title}</h3>
                <time className="hidden lg:inline font-mono text-sm">
                  {createdAt}
                </time>
              </Link>
            );
          })}
        </div>
        <div className="sm:col-span-2" />
      </section>
    </>
  );
}

export async function getAllNotesPreviewDataByTag(locale, tag) {
  try {
    const client = await clientPromise;
    const db = client.db("notes");
    const allNotesPreviewData = await db
      .collection(locale == "en" ? "en" : "fa")
      .find(
        { tags: tag },
        {
          projection: {
            _id: 0,
            title: 1,
            slug: 1,
            otherPageSlug: 1,
            createdAt: 1,
            tags: 1,
          },
        }
      )
      .toArray();

    let postsInDBAndLocal, otherPageSlug;

    if (allNotesPreviewData.length != 0) {
      const firstNote = allNotesPreviewData[0];
      const tagIndex = firstNote.tags.indexOf(tag);

      const firstNoteInOtherLang = await db
        .collection(locale == "en" ? "fa" : "en")
        .find(
          { slug: firstNote.otherPageSlug },
          { projection: { _id: 0, tags: 1 } }
        )
        .toArray();

      otherPageSlug = firstNoteInOtherLang[0].tags[tagIndex];
    }
    let all_codes_preview_metaData;
    if (otherPageSlug) {
      const data = await get_all_codes_by_tag_preview_data(locale, tag);
      all_codes_preview_metaData = data.all_codes_preview_metaData;
    } else {
      const data = await get_all_codes_by_tag_preview_data(locale, tag, true);
      all_codes_preview_metaData = data.all_codes_preview_metaData;
      otherPageSlug = data.tagInOtherLang;
    }

    postsInDBAndLocal = [...all_codes_preview_metaData, ...allNotesPreviewData];

    if (!postsInDBAndLocal.length) {
      throw new Error("");
    }
    // // same in blog > notes > GetAllNotes.js
    for (let post of postsInDBAndLocal) {
      const formattedDate = new Date(post.createdAt).toLocaleDateString(
        locale === "fa" ? "fa-IR" : "en-US",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      );
      post.createdAt = formattedDate;
    }
    return { postsInDBAndLocal, otherPageSlug };
  } catch (e) {
    console.error(
      e,
      "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Error in tags/[tag]/page.js"
    );
    notFound();
    // throw new Error(""); // good for production ( user )
  }
}
