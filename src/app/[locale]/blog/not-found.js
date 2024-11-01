import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
export default function NotFound() {
  const t = useTranslations("NotFoundPage");
  return (
    <>
      <div className="container" style={{ textAlign: "center" }}>
        <h1>{t("error")}</h1>
        <p>{t("postErrorExplanation")}</p>
        <Link href="/blog/code">{t("goBack")}</Link>
      </div>
    </>
  );
}
