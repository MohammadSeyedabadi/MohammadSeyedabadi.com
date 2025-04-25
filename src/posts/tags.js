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
    S: [
      "soon"
    ]
  };

const allFaTags = {
    ا: [
      "الگوریتم"
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
