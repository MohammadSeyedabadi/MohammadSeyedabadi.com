import Writings from "../Writings";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getAllPosts } from "@/posts/posts";

export async function generateMetadata() {
  const blogT = await getTranslations("blog");
  const ConfigT = await getTranslations("Config");
  return {
    title: `${blogT("Writings")} | ${ConfigT("SiteTitle")}`,
    description: blogT("CodeDesc"),
    alternates: {
      languages: {
        en: "/en/blog",
        fa: "/fa/بلاگ",
      },
    },
  };
}

export default async function Blog(props) {
  const params = await props.params;
  const { locale } = params;
  const allCodes = getAllPosts(locale);
  const t = await getTranslations("blog");
  const translation = {
    Notes: t("Notes"),
    NotesDesc: t("NotesDesc"),
    CodeDesc: t("CodeDesc"),
    Code: t("Code"),
    ViewAllTags: t("ViewAllTags"),
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 sm:grid sm:grid-cols-5">
      <section className="sm:col-span-3">
        <header className="mb-10">
          <h1 className="text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">
            {t("Writings")}
          </h1>
          <Writings translation={translation} />
        </header>

        <section>
          {Object.entries(allCodes).map(([key, value]) => {
            return (
              <div key={key} className="mb-7">
                <time className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-1">
                  {locale == "en" ? key : value[0].faYear}
                </time>
                <div className="text-lg">
                  {value.map((code) => {
                    const {
                      slug,
                      title,
                      formattedCreatedAtMonthDay,
                      faFormattedCreatedAtMonthDay,
                    } = code;
                    return (
                      <Link
                        key={title}
                        href={`/blog/code/${slug}`}
                        className="mb-4 flex items-center justify-between gap-3 font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 hover:border-rose-500 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-rose-300 active:scale-95 hover:visited:border-indigo-500 hover:dark:visited:border-indigo-300"
                      >
                        <h3>{title}</h3>
                        <time className="hidden lg:inline font-mono">
                          {locale == "en"
                            ? formattedCreatedAtMonthDay
                            : faFormattedCreatedAtMonthDay}
                        </time>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
      </section>
      <div className="sm:col-span-2" />
    </div>
  );
}
