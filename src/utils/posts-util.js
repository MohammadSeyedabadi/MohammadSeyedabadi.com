import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getAllPosts } from "@/posts/posts";

const postsDirectory = path.join(process.cwd(), "src/posts");

export async function getSinglePostFileData(postLocale, postSlug) {
  const filePath = path.join(postsDirectory, postLocale, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data: metaData, content } = matter(fileContent);
  return { metaData, content };
}

export async function getAllCodesPreviewData(locale) {
  const files_Path = path.join(postsDirectory, locale);
  const files = fs.readdirSync(files_Path);
  let file_path, fileContent, metaData;
  let allCodesPreviewData = [];
  for (let file of files) {
    file_path = path.join(files_Path, file);
    fileContent = fs.readFileSync(file_path, "utf-8");
    metaData = matter(fileContent).data;
    const formattedDate = new Date(metaData.createdAt).toLocaleDateString(
      metaData.lang === "fa" ? "fa-IR" : "en-US",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

    allCodesPreviewData.push({
      slug: metaData.slug,
      title: metaData.title,
      createdAt: formattedDate,
    });
  }
  return allCodesPreviewData;
}

export function get_all_codes_by_tag_preview_data(
  locale,
  tag,
  getOtherPageSlug = false
) {
  // const files_Path = path.join(postsDirectory, locale);
  // const files = fs.readdirSync(files_Path);
  // let file_path, fileContent, metaData, parsedFileContent;
  // let all_codes_preview_metaData = [];
  // for (let file of files) {
  //   file_path = path.join(files_Path, file);
  //   fileContent = fs.readFileSync(file_path, "utf-8");
  //   parsedFileContent = matter(fileContent);

  //   if (parsedFileContent.data.tags.includes(tagSlug)) {
  //     const { local, lang, slug, title, createdAt } = parsedFileContent.data;
  //     metaData = {
  //       local,
  //       lang,
  //       slug,
  //       title,
  //       createdAt,
  //     };
  //     all_codes_preview_metaData.push(metaData);
  //   }
  // }

  // if (getOtherPageSlug) {
  //   const indexOfTag = parsedFileContent.data.tags.indexOf(tagSlug);
  //   const lastPostInOtherLangFileData = await getSinglePostFileData(
  //     locale == "en" ? "fa" : "en",
  //     parsedFileContent.data.otherPageSlug
  //   );
  //   const tagInOtherLang =
  //     lastPostInOtherLangFileData.metaData.tags[indexOfTag];
  //   return { all_codes_preview_metaData, tagInOtherLang };
  // } else {
  //   return { all_codes_preview_metaData };
  // }

  // const allCodes = getAllPosts(locale);
  // let all_codes_preview_metaData = [];
  // let result = {};
  // let year;
  // for (const [key, posts] of Object.entries(allCodes)) {
  //   year = key;
  //   for (const eachPost of posts) {
  //     if (eachPost.tags.includes(tag)) {
  //       console.log(eachPost.title,"Aaaaaaaaaaaaaaaaaaaaaa")
  //       all_codes_preview_metaData.push({
  //         local: eachPost.local,
  //         lang: eachPost.lang,
  //         slug: eachPost.slug,
  //         title: eachPost.title,
  //         faYear: eachPost.faYear,
  //         createdAt:
  //           locale == "en"
  //             ? eachPost.formattedCreatedAtMonthDay
  //             : eachPost.faFormattedCreatedAtMonthDay,
  //         tags: eachPost.tags,
  //       });
  //       // Initialize result[year] as an array if it doesn't exist
  //       if (!result[year]) {
  //         result[year] = [];
  //       }
  //       // Add each post's metadata to the array for the correct year
  //       result[year].push(...all_codes_preview_metaData);
  //     }
  //   }
  // }
  const allCodes = getAllPosts(locale);
  let result = {};
  let year;

  for (const [key, posts] of Object.entries(allCodes)) {
    year = key;

    for (const eachPost of posts) {
      if (eachPost.tags.includes(tag)) {
        // Create the metadata object for this post
        const metadata = {
          local: eachPost.local,
          lang: eachPost.lang,
          slug: eachPost.slug,
          title: eachPost.title,
          faYear: eachPost.faYear,
          createdAt:
            locale == "en"
              ? eachPost.formattedCreatedAtMonthDay
              : eachPost.faFormattedCreatedAtMonthDay,
          tags: eachPost.tags,
        };

        // Initialize result[year] as an array if it doesn't exist
        if (!result[year]) {
          result[year] = [];
        }

        // Add the metadata object directly to the correct year
        result[year].push(metadata);
      }
    }
  }

  // // find other page slug
  const values = Object.values(result);
  const firstValue = values[0];
  let otherPageSlug;
  // console.log("---------", firstValue[0].tags.indexOf(tag), "--------");
  const allCodesInOtherLang = getAllPosts(locale == "en" ? "fa" : "en");
  let found = false;
  if (getOtherPageSlug) {
    const indexOfTag = firstValue[0].tags.indexOf(tag);
    for (const [key, posts] of Object.entries(allCodesInOtherLang)) {
      if (found) break;
      for (const eachPost of posts) {
        if (eachPost.otherPageSlug == firstValue[0].slug) {
          otherPageSlug = eachPost.tags[indexOfTag];
          found = true;
          break;
        }
      }
    }
    return { result, otherPageSlug };
  }
  return result;
}
