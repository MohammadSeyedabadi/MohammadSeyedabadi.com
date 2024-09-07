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

export async function get_all_posts_by_category_preview_data(
  locale,
  categorySlug
) {
  const files_Path = path.join(postsDirectory, locale);
  const files = fs.readdirSync(files_Path);
  let file_path, fileContent, metaData, parsedFileContent;
  let all_posts_preview_metaData = [];
  for (let file of files) {
    file_path = path.join(files_Path, file);
    fileContent = fs.readFileSync(file_path, "utf-8");
    parsedFileContent = matter(fileContent);
    if (categorySlug == parsedFileContent.data.category) {
      const { id, lang, title, createdAt, category } = parsedFileContent.data;
      metaData = {
        lang,
        title,
        createdAt,
        category,
        id,
      };
      all_posts_preview_metaData.push(metaData);
    }
  }
  return all_posts_preview_metaData;
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
      const { id, lang, title, createdAt, category } = parsedFileContent.data;
      metaData = {
        id,
        lang,
        title,
        createdAt,
        category,
      };
      all_posts_preview_metaData.push(metaData);
    }
  }
  const indexOfSlug = parsedFileContent.data.tags.indexOf(tagSlug);
  return { all_posts_preview_metaData, indexOfSlug };
}

export async function getAllTags(locale) {
  const files_Path = path.join(postsDirectory, locale);
  const files = fs.readdirSync(files_Path);
  let file_path, fileContent, parsedFileContent;
  let allTags = [];
  for (let file of files) {
    file_path = path.join(files_Path, file);
    fileContent = fs.readFileSync(file_path, "utf-8");
    parsedFileContent = matter(fileContent);
    let arrayOfPostTags = parsedFileContent.data.tags;
    for (let i = 0; i < arrayOfPostTags.length; i++) {
      if (!allTags.includes(arrayOfPostTags[i])) {
        allTags.push(arrayOfPostTags[i]);
      }
    }
  }
  return allTags;
}

export async function getOtherPageSlug(locale, id, parameter) {
  const other_lang_files_Path = path.join(
    postsDirectory,
    locale == "fa" ? "en" : "fa"
  );
  const files = fs.readdirSync(other_lang_files_Path);
  let file_path, fileContent, metaData;
  for (let file of files) {
    file_path = path.join(other_lang_files_Path, file);
    fileContent = fs.readFileSync(file_path, "utf-8");
    metaData = matter(fileContent).data;
    if (metaData.id == id && parameter == "category") {
      // for categories page
      return metaData.category;
    } else if (metaData.id == id && typeof parameter === "number") {
      // for tags page
      return metaData.tags[parameter];
    } else {
      return locale == "en"
        ? metaData.title.toLowerCase().replace(" ", "-")
        : metaData.title.replace(" ", "-");
    }
  }
}
