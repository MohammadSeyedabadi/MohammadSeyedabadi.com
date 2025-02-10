import { useTranslations } from "next-intl";
export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="mt-40 mb-8 flex justify-center items-center">
      <section className="p-4 bg-neutral-100/45 rounded-xl border-2 border-solid border-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 max-w-fit">
        <nav className="flex gap-8 items-center justify-center">
          <a
            href="https://www.linkedin.com/in/mohammad-seyedabadi-397a61256/"
            title={t("LinkedIn")}
            target="_blank"
            rel="noopener noreferrer"
            key="https://www.linkedin.com/in/mohammad-seyedabadi-397a61256/"
            className="flex gap-1 items-center text-sm font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-solid border-neutral-300 hover:border-rose-500 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-rose-300 active:scale-95 hover:visited:border-indigo-500 hover:dark:visited:border-indigo-300"
          >
            <span>{t("LinkedIn")}</span>
            <img
              src="/images/nav-linkedin.png"
              alt={t("LinkedIn")}
              className="max-w-5"
            />
          </a>
          <a
            href="https://github.com/MohammadSeyedabadi"
            title={t("GitHub")}
            target="_blank"
            rel="noopener noreferrer"
            key="https://github.com/MohammadSeyedabadi"
            className="flex gap-1 items-center text-sm font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-solid border-neutral-300 hover:border-rose-500 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-rose-300 active:scale-95 hover:visited:border-indigo-500 hover:dark:visited:border-indigo-300"
          >
            <span>{t("GitHub")}</span>
            <img
              src="/images/nav-github.png"
              alt={t("GitHub")}
              className="max-w-5"
            />
          </a>
        </nav>
      </section>
    </footer>
  );
}
