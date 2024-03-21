import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { blogSidebarData } from "@/data/blogSidebarData";

export default function BlogSidebar({ params }) {
  const t = useTranslations("blog");
  return (
    <aside className="post-sidebar">
      <div className="post-sidebar-card">
        <h2>{t("Categories")}</h2>
        <div className="list">
          {blogSidebarData.categories.map((category) => {
            return (
              <Link
                key={category.enName}
                href={`/categories/${category.enSlug}`}
                className="category"
              >
                <div className="name">
                  {params.locale == "en" ? category.enName : category.faName}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="post-sidebar-card">
        <h2>{t("Tags")}</h2>
        <div className="tags">
          {blogSidebarData.tags.map((tag) => {
            return (
              <Link
                key={tag.enName}
                href={`/tags/${tag.enSlug}`}
                className="tag"
              >
                {params.locale == "en" ? tag.enName : tag.faName}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
