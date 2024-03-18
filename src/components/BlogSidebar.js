import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export default function BlogSidebar() {
  const t = useTranslations("blog");
  return (
    <aside className="post-sidebar">
      <div className="post-sidebar-card">
        <h2>{t("Categories")}</h2>
        <div className="list">
          <Link href="/" className="category">
            <div className="name">نام دسته بندی</div>
            <div className="count">1</div>
          </Link>
        </div>
      </div>

      <div className="post-sidebar-card">
        <h2>{t("Tags")}</h2>
        <div className="tags">
          <Link href="/" className="tag">
            tag name
          </Link>
        </div>
      </div>
    </aside>
  );
}
