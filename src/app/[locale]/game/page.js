import config from "@/utils/config";
import Hero from "@/components/Hero";
import TicTacToe from "@/components/games/Tic Tac Toe/TicTocToe";
import { useTranslations } from "next-intl";

// export const metadata = {
//   title: `Let's play some game | ${config.siteTitle}`,
//   description: "Let's play some game",
// };

export async function generateMetadata({ params }) {
  const { locale, slug } = params;

  return {
    title: `${
      locale == "en"
        ? `Let's play some game | ${config.enSiteTitle}`
        : `بیایید یکم بازی کنیم | ${config.faSiteTitle}`
    }`,
    description:
      locale == "en" ? "Let's play some game." : "بیایید کمی بازی کنیم.",
    alternates: {
      canonical: "/game",
      languages: {
        "en-US": "/en/game",
        "fa-IR": "/fa/game",
      },
    },
  };
}

export default function Game() {
  const t = useTranslations("game");
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
