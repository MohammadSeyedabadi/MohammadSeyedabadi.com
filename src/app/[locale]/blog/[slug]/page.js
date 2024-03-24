import PostTemplate from "@/templates/post";
import { getAllPosts, getPostData } from "@/utils/posts-util";
import { useTranslations } from "next-intl";
import config from "@/utils/config";

export async function generateMetadata({ params }) {
  const { locale, slug } = params;
  const postData = getPostData(slug, locale);

  return {
    title: `${postData.title} | ${
      locale == "en" ? config.enSiteTitleiteTitle : config.faSiteTitle
    }`,
    description: postData.excerpt,
  };
}

export const dynamic = "force-dynamic";

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default function Page({ params }) {
  const t = useTranslations("blog");
  const translation = {
    AboutMe: t("AboutMe"),
    PostSideBarDescOne: t("PostSideBarDescOne"),
    PostSideBarDescTwo: t("PostSideBarDescTwo"),
    PostSideBarDescThree: t("PostSideBarDescThree"),
    PostDetails: t("PostDetails"),
    Published: t("Published"),
    Category: t("Category"),
    Tags: t("Tags"),
    Newsletter: t("Newsletter"),
    PostSideBarDescFour: t("PostSideBarDescFour"),
    SubscribeToTheNewsletter: t("SubscribeToTheNewsletter"),
  };

  // params also contains => locale
  const { slug, locale } = params;
  const postData = getPostData(slug, locale);

  return (
    <>
      <PostTemplate post={postData} translation={translation} />
    </>
  );
}
