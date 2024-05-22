import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export default function Heading({ title, description, slug }) {
  const t = useTranslations("Index");
  return (
    <h2 className="home-heading">
      <div>
        <div className="title">{title}</div>
        {description && <div className="description">{description}</div>}
      </div>
      {slug && (
        <Link className="nav--link-home" href={slug}>
          {t("viewAll")}
        </Link>
      )}
    </h2>
  );
}
