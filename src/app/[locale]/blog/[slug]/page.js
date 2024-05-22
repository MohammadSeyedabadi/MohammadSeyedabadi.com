import ProgrammingPostTemplate from "./ProgrammingPostTemplate";
import { getSinglePostFileData } from "@/utils/posts-util";
import { useTranslations } from "next-intl";
import config from "@/utils/config";
import GetData from "./GetData";

export async function generateMetadata({ params }) {
  const { locale, slug } = params;
  const {metaData} = await getSinglePostFileData(locale, slug);
  return {
    title: `${metaData.title} | ${
      locale == "en" ? config.enSiteTitle : config.faSiteTitle
    }`,
    description: metaData.excerpt,
    category: metaData.category.name,
    alternates: {
      languages: {
        en: `/en/blog/${slug}`,
        fa: `/fa/blog/${slug}`,
      },
    },
  };
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
      <GetData locale={locale} slug={slug} translation={translation}/>
    </>
  );
}
