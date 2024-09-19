import { getOtherPageSlug, getSinglePostFileData } from "@/utils/posts-util";
import ProgrammingPostTemplate from "./ProgrammingPostTemplate";
import SetLang from "@/components/SetLang";

export default async function GetData({ locale, slug, translation }) {
  let post = {};
  // throw new Error("Failed To Fetch Single Post File Data.")
  try {
    const { metaData, content } = await getSinglePostFileData(locale, slug);
    const otherPageSlug = await getOtherPageSlug(locale, metaData.id);
    post.metaData = metaData;
    post.content = content;
    post.otherPageSlug = otherPageSlug;
  } catch (error) {
    console.error(
      `Failed To Fetch Single Post File Data In blog/[slug]/GetData.js. Error Message : ${error}`
    );
  }
  return (
    <>
      <ProgrammingPostTemplate
        metaData={post.metaData}
        content={post.content}
        translation={translation}
      />
      <SetLang otherPageSlug={post.otherPageSlug} />
    </>
  );
}
