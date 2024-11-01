import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("NotFoundPage");
  return (
    <>
      <div className="container" style={{ textAlign: "center" }}>
        <h1>{t("error")}</h1>
        <p>{t("restErrorExplanation")}</p>
        <Link href="/">{t("goBackToMainPage")}</Link>
      </div>
    </>
  );
}
