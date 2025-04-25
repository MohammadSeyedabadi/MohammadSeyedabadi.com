const allEnTags = {
    D: [
      "database"
    ],
    S: [
      "soon"
    ],
    F: [
      "front-end"
    ],
    R: [
      "reactjs"
    ],
    A: [
      "algorithm"
    ]
  };

const allFaTags = {
    ا: [
      "الگوریتم"
    ],
    د: [
      "دیتابیس"
    ],
    س: [
      "سون"
    ],
    ف: [
      "فرانت-اند"
    ],
    ر: [
      "ریکت-جی-اس"
    ]
  };

export function getAllTags(locale) {
  if (locale === "en") {
    return allEnTags;
  } else {
    return allFaTags;
  }
}
