import config from "@/utils/config";
import { getAllPostsMetaData, getAllTags } from "@/utils/posts-util";
import Post from "@/components/Post";

export async function generateMetadata({ params }) {
  const { locale } = params;
  return {
    title: `${
      locale == "en"
        ? `Writing | ${config.enSiteTitle}`
        : `نوشته‌ها | ${config.faSiteTitle}`
    }`,
    description:
      locale == "en"
        ? "A list of all my posts."
        : "یک لیست از همه‌ی پست‌های من.",
    alternates: {
      languages: {
        en: "/en/blog",
        fa: "/fa/بلاگ",
      },
    },
  };
}

export default async function Blog({ params }) {
  let allPostsPreviewData, allTags;
  try {
    allTags = await getAllTags(params.locale);
    allPostsPreviewData = await getAllPostsMetaData(params.locale);
  } catch (error) {
    console.error(`Error Occurred In /blog/page.js. Error Message : ${error}`);
  }

  return (
    <>
      {allPostsPreviewData.map((eachPostPreviewData) => {
        return (
          <Post
            key={eachPostPreviewData.title}
            eachPostPreviewData={eachPostPreviewData}
            page="blog/pc"
          />
        );
      })}
    </>
  );
}
