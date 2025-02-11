import { Link } from "@/i18n/routing";
import { getAllCodesPreviewData } from "@/utils/posts-util";

export default async function GetAllCodes({ locale }) {
  let allCodesPreviewData;
  try {
    allCodesPreviewData = await getAllCodesPreviewData(locale);
  } catch (error) {
    console.error(`Error Occurred In /blog/page.js. Error Message : ${error}`);
  }
  return (
    <div className="posts">
      {allCodesPreviewData.map((eachCodePreviewData) => {
        const { slug, title, createdAt } = eachCodePreviewData;
        return (
          <Link key={slug} href={`/blog/code/${slug}`} className="post">
            <h3>{title}</h3>
            <time>{createdAt}</time>
          </Link>
        );
      })}
    </div>
  );
}
