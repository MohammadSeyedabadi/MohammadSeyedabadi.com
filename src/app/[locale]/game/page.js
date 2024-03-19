import config from "@/utils/config";
import Hero from "@/components/Hero";
import TicTacToe from "@/components/games/Tic Tac Toe/TicTocToe";

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
        : `بیایید کمی بازی کنیم | ${config.faSiteTitle}`
    }`,
    description:
      locale == "en"
        ? "Let's play some game."
        : "بیایید کمی بازی کنیم.",
  };
}

export default function Game() {
  return (
    <>
      <div className="container">
        <div className="grid">
          <div className="article-content">
            <Hero title="Game" />

            <section className="segment small">
              <div className="post-content">
                <p>
                  Here is the game that i was recently work on. the name of the
                  game is tic tac toe. Right now it is impossible to win and the
                  best result that you would get is a Tie! but i will definitely
                  make it more fun with some more features :))
                </p>
              </div>
            </section>
          </div>
          <TicTacToe />
          <div className="endgame">
            <div className="text">
              <button className="Replay">Replay</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
