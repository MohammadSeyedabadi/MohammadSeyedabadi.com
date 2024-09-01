import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export default function BlogSidebar({allTags}) {
  const t = useTranslations("blog");
  return (
    <aside className="post-sidebar">
      <div className="post-sidebar-card">
        <h2>{t("Tags")}</h2>
        <div className="tags">
          {allTags.map((tag) => {
            return (
              <Link key={tag} href={`/tags/${tag}`} className="tag">
                {tag}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
