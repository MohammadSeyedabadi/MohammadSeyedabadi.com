import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import config from "@/utils/config";
import Hero from "@/components/Hero";
import Heading from "@/components/Heading";
// import DecorationPhoto from "@/components/DecorationPhoto";
import PostPreview from "@/components/PostPreview";

// export const metadata = {
//   title: config.enSiteTitle,
//   description: config.description,
// };

export async function generateMetadata({ params }) {
  const { locale, slug } = params;

  return {
    title: locale == "en" ? config.enSiteTitle : config.faSiteTitle,
    description: locale == "en" ? config.enDescription : config.faDescription,
  };
}

export default function Index() {
  const indexPage = useTranslations("Index");
  const gamePage = useTranslations("game");
  return (
    <>
      <div className="container">
        <div className="hero-wrapper">
          <Hero title={indexPage("descOne")} index>
            <p className="hero-description small width">
              {indexPage("descTwo")}
              <br />
              <br />
              {indexPage("descThree")}{" "}
              <Link href="/projects">{indexPage("descFour")}</Link>{" "}
              {indexPage("descFive")}{" "}
              <Link href="/blog">{indexPage("descSix")}</Link>{" "}
              {indexPage("descSeven")}
            </p>
          </Hero>
          <div className="decoration">{/* <DecorationPhoto /> */}</div>
        </div>
      </div>
      <div className="container">
        <section className="segment first short">
          <Heading title={indexPage("projects")} slug="/projects" />
          <PostPreview />
        </section>
        <section className="segment large short">
          <Heading title={gamePage("games")} slug="/game" />
          <div className="posts newspaper">
            <Link className="post" href="/game">
              <h3>Tic Tac Toe</h3>
              <span>single-player</span>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
