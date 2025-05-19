const allEnTags = {
    R: [
      "reactjs"
    ],
    F: [
      "front-end"
    ],
    A: [
      "algorithm"
    ],
    D: [
      "database"
    ]
  };

const allFaTags = {
    ر: [
      "ریکت-جی-اس"
    ],
    ف: [
      "فرانت-اند"
    ],
    ا: [
      "الگوریتم"
    ],
    د: [
      "دیتابیس"
    ]
  };

export function getAllTags(locale) {
  if (locale === "en") {
    return allEnTags;
  } else {
    return allFaTags;
  }
}
