import Head from "next/head";
import config from "@/utils/config";
import Hero from "@/components/Hero";
import TitleIcon from "@/assets/TitleIcon";
import AboutSidebar from "@/components/AboutSidebar";
import TicTacToe from "@/components/games/Tic Tac Toe/TicTocToe";
export default function Game() {
  return (
    <>
      <Head>
        <title>{`Let's play some game | ${config.siteTitle}`}</title>
        <meta name="description" content="Let's play some game" />
      </Head>
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
          <TicTacToe/>
        </div>
      </div>
    </>
  );
}
