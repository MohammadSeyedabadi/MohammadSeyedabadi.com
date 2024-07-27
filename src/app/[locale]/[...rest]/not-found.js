import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
export default function NotFound() {
  const t = useTranslations("NotFoundPage");
  return (
    <>
      <div className="container" style={{ textAlign: "center" }}>
        <h1 className="text-xl font-semibold">{t("error")}</h1>
        <p>{t("restErrorExplanation")}</p>
        <Link href="/">{t("goBackToMainPage")}</Link>
      </div>
    </>
  );
}
