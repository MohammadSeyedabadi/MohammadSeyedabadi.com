import { getSinglePostFileData } from "@/utils/posts-util";
import ProgrammingPostTemplate from "./ProgrammingPostTemplate";
export default async function GetData({ locale, slug, translation }) {
  const { metaData, content } = await getSinglePostFileData(locale, slug);
  return (
    <>
      <ProgrammingPostTemplate
        metaData={metaData}
        content={content}
        translation={translation}
      />
    </>
  );
}
