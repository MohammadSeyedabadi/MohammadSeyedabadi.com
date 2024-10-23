import Hero from "@/components/Hero";
import TicTacToe from "@/components/games/Tic Tac Toe/TicTocToe";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(props) {
  const params = await props.params;
  const { locale } = params;
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


export default function Game() {
  const t = useTranslations("Game");
  const translation = {
    youWin: t("youWin"),
    youLose: t("youLose"),
    tieGame: t("tieGame"),
    replay: t("replay"),
  };
  return (
    <>
      <div className="container">
        <div className="grid">
          <div className="article-content">
            <Hero title={t("game")} />

            <section className="segment small">
              <div className="post-content">
                <p>{t("descOne")}</p>
              </div>
            </section>
          </div>
          <TicTacToe translation={translation} />
        </div>
      </div>
    </>
  );
}
