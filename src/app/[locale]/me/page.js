import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import TitleIcon from "@/assets/TitleIcon";
// import Hero from "@/components/Hero";

export async function generateMetadata() {
  const t = await getTranslations("Config");

  return {
    title: `${t("AboutMe")} | ${t("SiteTitle")}`,
    description: `${t("Read")} ${t("SiteTitle")}`,
    alternates: {
      languages: {
        en: "/en/me",
        fa: "/fa/درباره-من",
      },
    },
  };
}

export default function AboutMe() {
  const t = useTranslations("me");
  return (
    <div className="sm:grid sm:grid-cols-12 max-w-6xl mx-auto px-4 sm:px-8 gap-24">
      <section className="sm:col-span-8">
        <header className="mb-12 md:mb-8">
          <h1 className="text-5xl font-bold text-neutral-800 dark:text-neutral-100">
            {t("descOne")}
          </h1>
        </header>
        <p className="text-lg mb-5 text-neutral-800 dark:text-neutral-300 ">
          {t("descTwo")} <Link href="/projects">{t("descThree")} </Link>
          {t("descFour")}
          <Link href="/blog"> {t("descFive")}</Link> {t("descSix")}
        </p>

        <h2
          id="work-experience"
          className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 border-b-2 border-neutral-300 dark:border-neutral-700 mt-12 mb-4"
        >
          <a
            href="#work-experience"
            aria-label="work experience permalink"
            className="hover:text-indigo-500 dark:hover:text-indigo-300 post"
          >
            {t("descSeven")}
            <span className="inline-flex">
              <TitleIcon />
            </span>
          </a>
        </h2>
        <p className="text-lg mb-5 text-neutral-800 dark:text-neutral-300">
          {t("descEight")}{" "}
          <a
            href="https://github.com/MohammadSeyedabadi"
            target="_blank"
            rel="noreferrer"
            className="text-lg hover:underline text-rose-500 dark:text-rose-300 inline-block active:scale-95 visited:text-indigo-500 dark:visited:text-indigo-300"
          >
            {t("descEleven")}
          </a>{" "}
          {t("descTwelve")}{" "}
          <a
            href="https://www.linkedin.com/in/mohammad-seyedabadi-397a61256/"
            target="_blank"
            rel="noreferrer"
            className="text-lg hover:underline text-rose-500 dark:text-rose-300 inline-block active:scale-95 visited:text-indigo-500 dark:visited:text-indigo-300"
          >
            {t("descThirteen")}
          </a>{" "}
          {t("descFourteen")} {t("descFifteen")}{" "}
          <strong>
            <u>mhmd.sey.7</u>
          </strong>{" "}
          at{" "}
          <strong>
            <u>gmail.com</u>
          </strong>
        </p>
      </section>
      <aside className="sm:col-span-4">
        <div className="p-6 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 dark:bg-neutral-800 dark:border-neutral-500">
          <h2 className="uppercase font-bold text-sm mb-2">{t("me")}</h2>
          <img src="/images/me.jpg" alt="me" className="sm:w-80 max-w-[100%]" />
        </div>
      </aside>
    </div>
  );
}
