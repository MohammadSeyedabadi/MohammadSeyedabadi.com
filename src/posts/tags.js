const allEnTags = {
    R: [
      "reactjs"
    ],
    A: [
      "algorithm"
    ],
    D: [
      "database"
    ],
    F: [
      "front-end"
    ]
  };

const allFaTags = {
    ر: [
      "ریکت-جی-اس"
    ],
    د: [
      "دیتابیس"
    ],
    ف: [
      "فرانت-اند"
    ],
    ا: [
      "الگوریتم"
    ]
  };

export function getAllTags(locale) {
  if (locale === "en") {
    return allEnTags;
  } else {
    return allFaTags;
  }
}
