const faAllTags = ["فرانت-اند", "الگوریتم", "ریکت-جی-اس"];
const enAllTags = ["front-end", "algorithm", "reactjs"];

export function getAllTags(locale) {
  if (locale == "en") {
    return enAllTags;
  } else {
    return faAllTags;
  }
}
