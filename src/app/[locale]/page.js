import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Heading from "@/components/Heading";
import PostPreview from "@/components/PostPreview";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("Config");
  return {
    title: t("SiteTitle"),
    description: t("Description"),
  };
}

export default function Index() {
  const indexPage = useTranslations("Index");
  const gamePage = useTranslations("Game");
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="sm:grid sm:grid-cols-5 items-center">
          <header className="col-span-3 text-neutral-800 dark:text-neutral-300">
            <h1 className="text-5xl dark:text-neutral-100 mb-3">
              {indexPage("descOne")}
            </h1>
            {/* <p className="max-w-md"> */}
            <p className="max-w-md ltr:first-line:uppercase ltr:first-line:tracking-widest ltr:first-letter:text-7xl ltr:first-letter:font-bold ltr:first-letter:mr-3 ltr:first-letter:float-left">
              {indexPage("descTwo")}
              <br />
              <br className="ltr:hidden" />
              {indexPage("descThree")}{" "}
              <Link
                href="/projects"
                className="hover:underline text-indigo-500 dark:text-indigo-300 inline-block active:scale-95 visited:text-rose-500 dark:visited:text-rose-300"
              >
                {indexPage("descFour")}
              </Link>{" "}
              {indexPage("descFive")}{" "}
              <Link
                href="/blog/notes"
                className="hover:underline text-indigo-500 dark:text-indigo-300 inline-block active:scale-95 visited:text-rose-500 dark:visited:text-rose-300"
              >
                {indexPage("descSix")}
              </Link>
            </p>
          </header>

          <div className="sm:col-span-2 max-w-[50vw] self-center justify-self-center">
            <img src="/images/mandala flower.PNG" alt="mandala flower" />
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <section className="max-w-3xl">
          <Heading title={indexPage("projects")} slug="/projects" />
          <PostPreview />
        </section>
        <section className="max-w-3xl">
          <Heading title={gamePage("games")} slug="/game" />
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative break-all px-4 pt-4 pb-14 bg-neutral-100/45 rounded-xl border-2 border-solid border-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500">
              <div>
                <Link
                  className="text-lg hover:underline text-indigo-500 dark:text-indigo-300 inline-block active:scale-95 visited:text-rose-500 dark:visited:text-rose-300"
                  href="/game"
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  {gamePage("TicTacToe")}
                </Link>
                <p className="text-base text-neutral-500 dark:text-neutral-300">
                  {gamePage("TicTacToeDesc")}
                </p>
              </div>
              <div className="absolute bottom-3 flex gap-5">
                <Link
                  className="flex gap-1 items-center text-sm font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-solid border-neutral-300 hover:border-indigo-500 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-indigo-300 active:scale-95  hover:visited:border-rose-500 hover:dark:visited:border-rose-300"
                  href="/game"
                >
                  {gamePage("Play")}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
