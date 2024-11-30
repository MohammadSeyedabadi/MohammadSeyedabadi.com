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

export default async function Page(props) {
  const params = await props.params;
  const { locale } = params;
  const allTags = getAllTags(locale);
  return (
    <div className="container">
      <div className="grid">
        <div>
          <p>
            <Link href="/blog/code">
              {locale == "en"
                ? "← Notes related to code"
                : "→ یادداشت‌های مربوط به کد"}
            </Link>
          </p>
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
