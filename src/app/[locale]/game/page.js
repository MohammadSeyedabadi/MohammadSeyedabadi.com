import TicTacToe from "@/components/games/Tic Tac Toe/TicTocToe";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  // const params = await props.params;
  // const { locale } = params;
  const Config = await getTranslations("Config");
  const Game = await getTranslations("Game");
  return {
    title: `${Game("letsplay")} | ${Config("SiteTitle")}`,
    description: Game("letsplay"),
    alternates: {
      languages: {
        en: "/en/game",
        fa: "/fa/بازی",
      },
    },
  };
}

export async function generateStaticParams() {
  const locales = ['en', 'fa']; // Add more if needed
  return locales.map((locale) => ({ locale }));
}

export default function Game() {
  const t = useTranslations("Game");
  const translation = {
    youWin: t("youWin"),
    youLose: t("youLose"),
    tieGame: t("tieGame"),
    replay: t("replay"),
    ticTacToe: t("TicTacToe")
  };
  return (
    <div className="sm:grid sm:grid-cols-12 max-w-6xl mx-auto px-4 sm:px-8 gap-24">
      <section className="sm:col-span-8">
        <header className="mb-12 md:mb-8">
          <h1 className="text-5xl font-bold text-neutral-800 dark:text-neutral-100">
            {t("game")}
          </h1>
        </header>

        <p className="text-lg mb-5 text-neutral-800 dark:text-neutral-300">
          {t("descOne")}
        </p>
      </section>
      <TicTacToe translation={translation} />
    </div>
  );
}
