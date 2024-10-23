import { getAllPostsMetaData } from "@/utils/posts-util";
import Hero from "@/components/Hero";
import Writings from "../Writings";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";

export async function generateMetadata() {
  const blogT = await getTranslations("blog");
  const ConfigT = await getTranslations("Config");
  return {
    title: `${blogT("Writings")} | ${ConfigT("SiteTitle")}`,
    description: blogT("CodeDesc"),
    alternates: {
      languages: {
        en: "/en/blog",
        fa: "/fa/بلاگ",
      },
    },
  };
}

export default async function Blog(props) {
  const params = await props.params;
  let allPostsPreviewData;
  try {
    allPostsPreviewData = await getAllPostsMetaData(params.locale);
  } catch (error) {
    console.error(`Error Occurred In /blog/page.js. Error Message : ${error}`);
  }

  const t = await getTranslations("blog");
  const translation = {
    Notes: t("Notes"),
    NotesDesc: t("NotesDesc"),
    CodeDesc: t("CodeDesc"),
    Code: t("Code"),
    ViewAllTags: t("ViewAllTags"),
  };

  return (
    <section className="container markdown-content">
      <div className="grid">
        <div className="article-content">
          <Hero title={t("Writings")}>
            <Writings translation={translation} />
          </Hero>
          <section className="segment">
            <div className="posts">
              {allPostsPreviewData.map((eachPostPreviewData) => {
                const { lang, slug, title, createdAt } = eachPostPreviewData;

                const formattedDate = new Date(createdAt).toLocaleDateString(
                  lang === "fa" ? "fa-IR" : "en-US",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                );
                return (
                  <Link key={slug} href={`/blog/code/${slug}`} className="post">
                    <h3>{title}</h3>
                    <time>{formattedDate}</time>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
        {/* <div className="sidebar-content"></div> */}
      </div>
    </section>
  );
}
