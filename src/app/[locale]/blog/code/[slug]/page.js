import { getSinglePostFileData } from "@/utils/posts-util";
import { getTranslations } from "next-intl/server";
import SetLang from "@/components/SetLang";
import { notFound } from "next/navigation";
import Post from "./Post";

export async function generateMetadata(props) {
  const params = await props.params;
  const t = await getTranslations("Config");
  const { locale, slug } = params;
  try {
    const { metaData } = await getSinglePostFileData(
      locale,
      locale == "fa" ? decodeURI(slug) : slug
    );

    return {
      title: `${metaData.title} | ${t("SiteTitle")}`,
      description: metaData.excerpt,
      alternates: {
        languages: {
          en: `/en/blog/${slug}`,
          fa: `/fa/بلاگ/${slug}`,
        },
      },
    };
  } catch (error) {
    console.error(
      `Faild To Fetch Meta Data in blog/[slug]/page.js. Error Message : ${error}`
    );
  }
}

export default async function Page(props) {
  const params = await props.params;
  const { locale, slug } = params;
  let post = {};

  try {
    const { metaData, content } = await getSinglePostFileData(
      locale,
      locale == "fa" ? decodeURI(slug) : slug
    );
    const otherPageSlug = metaData.otherPageSlug
    post.metaData = metaData;
    post.content = content;
    post.otherPageSlug = otherPageSlug;
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
      <Post
        metaData={post.metaData}
        content={post.content}
        translation={translation}
      />
      <SetLang otherPageSlug={post.otherPageSlug} />
    </>
  );
}
