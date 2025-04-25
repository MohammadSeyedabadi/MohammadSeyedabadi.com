import { getAllPosts } from "@/posts/posts";
import { getTranslations } from "next-intl/server";
import SetLang from "@/components/SetLang";
import { notFound } from "next/navigation";
import Post from "./Post";

export async function generateMetadata(props) {
  const params = await props.params;
  const t = await getTranslations("Config");
  let { locale, slug } = params;
  slug = locale == "fa" ? decodeURI(slug) : slug;
  try {
    const allPosts = getAllPosts(locale);
    for (const [key, posts] of Object.entries(allPosts)) {
      for (const eachPost of posts) {
        if (eachPost.slug == slug) {
          return {
            title: `${eachPost.title} | ${t("SiteTitle")}`,
            description: eachPost.excerpt,
            alternates: {
              languages: {
                en: `/en/blog/${slug}`,
                fa: `/fa/بلاگ/${slug}`,
              },
            },
          };
        }
      }
    }
  } catch (error) {
    console.error(
      `Faild To Fetch Meta Data in blog/[slug]/page.js. Error Message : ${error}`
    );
  }
}

export default async function Page(props) {
  // notFound()
  const params = await props.params;
  let { locale, slug } = params;
  slug = locale == "fa" ? decodeURI(slug) : slug;
  let metaData = {};
  let found = false;
  try {
    const allPosts = getAllPosts(locale);
    for (const [key, posts] of Object.entries(allPosts)) {
      if (found) break;
      for (const eachPost of posts) {
        if (eachPost.slug == slug) {
          metaData.otherPageSlug = eachPost.otherPageSlug;
          metaData.lang = eachPost.lang;
          metaData.title = eachPost.title;
          metaData.image = eachPost.image;
          metaData.createdAt = eachPost.createdAt;
          metaData.lastModified = eachPost.lastModified;
          metaData.tags = eachPost.tags;
          metaData.content = eachPost.content;
          found = true;
          break;
        }
      }
    }
  } catch (e) {
    console.error(
      `Failed To Fetch Single Post File Data In blog/[slug]/GetData.js. Error Message : ${e}`
    );
    notFound();
  }

  const t = await getTranslations("blog");
  const translation = {
    PostDetails: t("PostDetails"),
    Tags: t("Tags"),
    Published: t("Published"),
    LastEdited: t("LastEdited"),
    SubscribeToTheNewsletter: t("SubscribeToTheNewsletter"),
  };

  return (
    <>
      <Post metaData={metaData} translation={translation} />
      <SetLang otherPageSlug={metaData.otherPageSlug} />
    </>
  );
}
