import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { getAllTags } from "@/posts/tags";
import { Link } from "@/navigation";

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

export default function page({ params }) {
  const { locale } = params;
  const allTags = getAllTags(locale);
  const t = useTranslations("blog");
  return (
    <div className="container">
      <h2>{t("Tags")}:</h2>
      <div className="tags">
        {allTags.map((tag) => {
          return (
            <Link key={tag} href={`/blog/code/tags/${tag}`} className="tag">
              {tag}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
