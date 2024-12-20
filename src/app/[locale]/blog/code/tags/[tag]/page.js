import { getTranslations } from "next-intl/server";
import { get_all_posts_by_tag_preview_data } from "@/utils/posts-util";
import Hero from "@/components/Hero";
import SetLang from "@/components/SetLang";
import { Link } from "@/i18n/routing";

export async function generateMetadata(props) {
  const params = await props.params;
  const t = await getTranslations("Config");
  const { locale, tag } = params;

  return {
    title: `${locale == "en" ? tag : decodeURI(tag)} | ${t("SiteTitle")}`,
    description: `${t("Tag")} : ${tag}`,
    alternates: {
      languages: {
        en: `/en/tags/${tag}`,
        fa: `/fa/تگ-ها/${tag}`,
      },
    },
  };
}

export default async function tag(props) {
  const params = await props.params;
  let { locale, tag } = params;
  locale == "fa" && (tag = decodeURI(tag));
  let all_posts_preview_metaData, tagInOtherLang;
  try {
    const data = await get_all_posts_by_tag_preview_data(locale, tag);
    all_posts_preview_metaData = data.all_posts_preview_metaData;
    tagInOtherLang = data.tagInOtherLang;
  } catch (error) {
    console.error(
      `Failed To Fetch All Posts Meta Data In /tags/[tag]/page.js. Error Message : ${error}`
    );
  }

  return (
    <section className="container markdown-content">
      <SetLang otherPageSlug={tagInOtherLang} />
      <div className="grid">
        <div className="article-content">
          <p>
            <Link href="/blog/code/tags">
              {locale == "en" ? "← All Tags Page" : "→ همه تگ‌ها"}
            </Link>
          </p>
          <Hero
            subTitle={locale == "en" ? " posts tagged:" : " پست شامل تگ:"}
            highlight={all_posts_preview_metaData.length}
            title={tag}
          />
          <div className="segment">
            <div className="posts">
              {all_posts_preview_metaData.map((eachPostPreviewData) => {
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
          </div>
        </div>
      </div>
    </section>
  );
}
