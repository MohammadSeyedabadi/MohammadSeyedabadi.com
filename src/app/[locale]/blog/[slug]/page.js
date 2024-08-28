import { getSinglePostFileData } from "@/utils/posts-util";
import { useTranslations } from "next-intl";
import config from "@/utils/config";
import GetData from "./GetData";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { locale, slug } = params;
  try {
    const { metaData } = await getSinglePostFileData(locale, decodeURI(slug));
    
    return {
      title: `${metaData.title} | ${
        locale == "en" ? config.enSiteTitle : config.faSiteTitle
      }`,
      description: metaData.excerpt,
      category: metaData.category.name,
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
    notFound();
  }
}

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
    SubscribeToTheNewsletter: t("SubscribeToTheNewsletter"),
  };

  const { locale, slug } = params;

  return (
    <>
      <GetData locale={locale} slug={decodeURI(slug)} translation={translation} />
    </>
  );
}
