const allEnTags = {
    F: [
      "front-end"
    ],
    A: [
      "algorithm"
    ],
    D: [
      "database"
    ],
    R: [
      "reactjs"
    ]
  };

const allFaTags = {
    ر: [
      "ریکت-جی-اس"
    ],
    ف: [
      "فرانت-اند"
    ],
    د: [
      "دیتابیس"
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
