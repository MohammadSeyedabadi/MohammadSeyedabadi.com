import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Hero from "@/components/Hero";
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
          <Hero title={indexPage("descOne")} index>
            <p className="hero-description small width">
              {indexPage("descTwo")}
              <br />
              <br />
              {indexPage("descThree")}{" "}
              <Link href="/projects">{indexPage("descFour")}</Link>{" "}
              {indexPage("descFive")}{" "}
              <Link href="/blog/notes">{indexPage("descSix")}</Link>
            </p>
          </Hero>
          <div className="sm:col-span-2 max-w-[50vw] self-center justify-self-center">
            <img src="/images/mandala flower.PNG" alt="mandala flower" />
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
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
