import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getAllTags } from "@/posts/tags";

export async function generateMetadata() {
  const t = await getTranslations("Config");

  return {
    title: `${t("Tags")} | ${t("SiteTitle")}`,
    description: t("TagsList"),
    alternates: {
      languages: {
        en: "/en/blog/code/tags",
        fa: "/fa/بلاگ/کد/تگ-ها",
      },
    },
  };
}

export default async function Tags(props) {
  const params = await props.params;
  const { locale } = params;
  const allTags = getAllTags(locale);
  const t = await getTranslations("Tags");
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8">
      <h1 className="text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">
        {t("AllTags")}
      </h1>
      <p className="mb-6">
        <Link
          href="/blog/code"
          className="text-lg hover:underline text-rose-500 dark:text-rose-300 inline-block active:scale-95 visited:text-indigo-500 dark:visited:text-indigo-300"
        >
          {t("CodeLinkDesc")}
        </Link>
      </p>
      {Object.entries(allTags).map(([key, value]) => {
        return (
          <div key={key} className="mb-7">
            <h3 className="text-xl font-black mb-1">{key.toUpperCase()}</h3>
            <div className="flex flex-wrap items-center gap-3">
              {value.map((tag) => {
                return (
                  <>
                    <Link
                      key={tag}
                      href={`/blog/code/tags/${tag}`}
                      className="text-sm font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 hover:border-rose-500 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-rose-300 active:scale-95 hover:visited:border-indigo-500 hover:dark:visited:border-indigo-300"
                    >
                      {tag}
                    </Link>
                  </>
                );
              })}
              <Link
                href={`/blog/code/tags/`}
                className="text-sm font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 hover:border-rose-500 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-rose-300 active:scale-95 hover:visited:border-indigo-500 hover:dark:visited:border-indigo-300"
              >
                Photoshop CC
              </Link>   <Link
                
                href={`/blog/code/tags/`}
                className="text-sm font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 hover:border-rose-500 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-rose-300 active:scale-95 hover:visited:border-indigo-500 hover:dark:visited:border-indigo-300"
              >
                Photoshop CC
              </Link>   <Link
                
                href={`/blog/code/tags/`}
                className="text-sm font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 hover:border-rose-500 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-rose-300 active:scale-95 hover:visited:border-indigo-500 hover:dark:visited:border-indigo-300"
              >
                Photoshop CC
              </Link>   <Link
                
                href={`/blog/code/tags/`}
                className="text-sm font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 hover:border-rose-500 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-rose-300 active:scale-95 hover:visited:border-indigo-500 hover:dark:visited:border-indigo-300"
              >
                Photoshop CC
              </Link>   <Link
                
                href={`/blog/code/tags/`}
                className="text-sm font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 hover:border-rose-500 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-rose-300 active:scale-95 hover:visited:border-indigo-500 hover:dark:visited:border-indigo-300"
              >
                Photoshop CC
              </Link>   <Link
                
                href={`/blog/code/tags/`}
                className="text-sm font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 hover:border-rose-500 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-rose-300 active:scale-95 hover:visited:border-indigo-500 hover:dark:visited:border-indigo-300"
              >
                Photoshop CC
              </Link>   <Link
                
                href={`/blog/code/tags/`}
                className="text-sm font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 hover:border-rose-500 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-rose-300 active:scale-95 hover:visited:border-indigo-500 hover:dark:visited:border-indigo-300"
              >
                Photoshop CC
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
