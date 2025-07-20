import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Heading({ title, description, slug }) {
  const t = useTranslations("Index");
  return (
    <h2 className="flex items-center justify-between my-8">
      <div>
        <div className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
          {title}
        </div>
        {description && <div className="description">{description}</div>}
      </div>
      {slug && (
        <Link
          className="text-sm font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 inline-block active:scale-95 hover:border-indigo-500 hover:dark:border-indigo-300"
          href={slug}
        >
          {t("viewAll")}
        </Link>
      )}
    </h2>
  );
}
