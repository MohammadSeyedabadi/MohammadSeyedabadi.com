const allEnTags = {
    A: [
      "algorithm"
    ],
    R: [
      "reactjs"
    ],
    D: [
      "database"
    ],
    S: [
      "soon"
    ],
    F: [
      "front-end"
    ]
  };

const allFaTags = {
    ر: [
      "ریکت-جی-اس"
    ],
    س: [
      "سون"
    ],
    ا: [
      "الگوریتم"
    ],
    ف: [
      "فرانت-اند"
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
