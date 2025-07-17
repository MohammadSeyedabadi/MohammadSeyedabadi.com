import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
export default function NotFound() {
  const t = useTranslations("NotFoundPage");
  return (
    <div className="max-w-fit mx-auto px-4 sm:px-8 text-center p-4 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500">
      <h1 className="font-extrabold text-9xl">{t("error")}</h1>
      <p>{t("postErrorExplanation")}</p>
      <Link
        href="/blog"
        className="mt-4 font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 inline-block active:scale-95 hover:border-indigo-500 hover:dark:border-indigo-300"
      >
        {t("goBackToBlogPage")}
      </Link>
    </div>
  );
}
