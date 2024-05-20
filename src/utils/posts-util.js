import fs from "fs";
import path from "path";

import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/posts");

export async function getSinglePostFileData(postLocale, postSlug) {
  const filePath = path.join(
    postsDirectory,
    `${postLocale + "-" + postSlug}.md`
  );
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const { data: metaData, content } = matter(fileContent);
  const singPostFileData = {
    metaData,
    content,
  };

  return singPostFileData;
}

export async function getAllPostsMetaData() {
  const files = fs.readdirSync(postsDirectory);
  let allPostsMetaData = [];
  for (let file of files) {
    file = file.replace(/\.md$/, "").split("-");
    const postLocale = file.shift();
    const postSlug = file.join("-");
    const { metaData } = await getSinglePostFileData(postLocale, postSlug);
    allPostsMetaData.push(metaData);
  }
  return allPostsMetaData;
}
