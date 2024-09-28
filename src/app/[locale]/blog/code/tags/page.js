import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { getAllTags } from "@/posts/tags";

export async function generateMetadata() {
  const t = await getTranslations("Config");

  return {
    title: `${t("Tags")} | ${t("SiteTitle")}`,
    description: t("TagsList"),
    alternates: {
      languages: {
        en: "/blog/code/tags",
        fa: "/بلاگ/کد/تگ-ها",
      },
    },
  };
}

export default function Page({ params }) {
  const { locale } = params;
  const allTags = getAllTags(locale);
  const t = useTranslations("blog");
  return (
    <div className="container">
      <div className="grid">
        <div>
          {Object.entries(allTags).map(([key, value]) => {
            return (
              <div key={key} className="alphabetical-tags">
                <h3>{key.toUpperCase()}</h3>
                <div className="tags">
                  {value.map((tag) => {
                    return (
                      <Link
                        key={tag}
                        href={`/blog/code/tags/${tag}`}
                        className="tag"
                      >
                        {tag}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div />
      </div>
    </div>
  );
}
