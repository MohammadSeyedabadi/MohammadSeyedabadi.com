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
    <>
      {allCodesPreviewData.map((eachCodePreviewData) => {
        const { slug, title, createdAt } = eachCodePreviewData;

        return (
          <Link
            key={slug}
            href={`/blog/code/${slug}`}
            className="mb-4 flex items-center justify-between gap-3 font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 hover:border-rose-500 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-rose-300 active:scale-95 hover:visited:border-indigo-500 hover:dark:visited:border-indigo-300"
          >
            <h3 className="text-lg">{title}</h3>
            <time className="hidden lg:inline font-mono text-sm">{createdAt}</time>
          </Link>
        );
      })}
    </>
  );
}
