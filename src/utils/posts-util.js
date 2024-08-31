import fs from "fs";
import path from "path";

import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/posts");

export async function getSinglePostFileData(postLocale, postSlug) {
  const filePath = path.join(postsDirectory, postLocale, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const { data: metaData, content } = matter(fileContent);
  const singPostFileData = {
    metaData,
    content,
  };

  return singPostFileData;
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

export async function get_all_posts_by_category_preview_data(locale) {
  const files_Path = path.join(postsDirectory, locale);
  const files = fs.readdirSync(files_Path);
  let file_path, fileContent, metaData;
  let all_posts_preview_metaData = [];
  for (let file of files) {
    file_path = path.join(files_Path, file);
    fileContent = fs.readFileSync(file_path, "utf-8");
    const { lang, title, createdAt, category } = matter(fileContent).data;
    metaData = {
      lang,
      title,
      createdAt,
      category,
    };
    all_posts_preview_metaData.push(metaData);
  }
  return all_posts_preview_metaData;
}
