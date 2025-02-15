import clientPromise from "@/utils/mongodb";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("Config");
  return {
    title: `${t("Tags")} | ${t("SiteTitle")}`,
    description: t("TagsList"),
    alternates: {
      languages: {
        en: "/en/blog/notes",
        fa: "/fa/تگ-ها",
      },
    },
  };
}

export default async function page(props) {
  const params = await props.params;
  const { locale } = params;
  const allTags = await getAllTagsFromDB(locale);
  return (
    <div className="container">
      <div className="grid">
        <div>
          <p>
            <Link href="/blog/notes">
              {locale == "en" ? "← Notes page" : "→ یادداشت‌ها"}
            </Link>
          </p>
          {Object.entries(allTags).map(([key, value]) => {
            return (
              <div key={key} className="alphabetical-tags">
                <h3>{key.toUpperCase()}</h3>
                <div className="tags">
                  {value.map((tag) => {
                    return (
                      <Link key={tag} href={`/tags/${tag}`} className="tag">
                        {tag}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div />
      </div>
    </div>
  );
}

export async function getAllTagsFromDB(locale) {
  try {
    const client = await clientPromise;
    const db = client.db("notes");

    let allTags = await db
      .collection(locale == "en" ? "enTags" : "faTags")
      .find({}, { projection: { _id: 0 } })
      .toArray();

    let allTagsCopy = JSON.parse(JSON.stringify(allTags[0])); // copy the value because of deleting in for loop

    for (const key in allTags[0]) {
      if (allTags[0][key].length === 0) {
        delete allTagsCopy[key];
      }
    }
    return allTagsCopy;
  } catch (error) {
    throw new Error(e);
  }
}
