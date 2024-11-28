import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/posts");

export async function getSinglePostFileData(postLocale, postSlug) {
  const filePath = path.join(postsDirectory, postLocale, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data: metaData, content } = matter(fileContent);
  return { metaData, content };
}

export async function getAllPostsMetaData(locale) {
  const files_Path = path.join(postsDirectory, locale);
  const files = fs.readdirSync(files_Path);
  let file_path, fileContent, metaData;
  let allPostsMetaData = [];
  for (let file of files) {
    file_path = path.join(files_Path, file);
    fileContent = fs.readFileSync(file_path, "utf-8");
    metaData = matter(fileContent).data;
    allPostsMetaData.push(metaData);
  }
  return allPostsMetaData;
}

export async function get_all_posts_by_tag_preview_data(locale, tagSlug) {
  const files_Path = path.join(postsDirectory, locale);
  const files = fs.readdirSync(files_Path);
  let file_path, fileContent, metaData, parsedFileContent;
  let all_posts_preview_metaData = [];
  for (let file of files) {
    file_path = path.join(files_Path, file);
    fileContent = fs.readFileSync(file_path, "utf-8");
    parsedFileContent = matter(fileContent);

    if (parsedFileContent.data.tags.includes(tagSlug)) {
      const { lang, slug, title, createdAt } = parsedFileContent.data;
      metaData = {
        lang,
        slug,
        title,
        createdAt,
      };
      all_posts_preview_metaData.push(metaData);
    }
  }
  const indexOfTag = parsedFileContent.data.tags.indexOf(tagSlug);
  const lastPostInOtherLangFileData = await getSinglePostFileData(
    locale == "en" ? "fa" : "en",
    parsedFileContent.data.otherPageSlug
  );
  const tagInOtherLang = lastPostInOtherLangFileData.metaData.tags[indexOfTag]
  return { all_posts_preview_metaData, tagInOtherLang };
}
