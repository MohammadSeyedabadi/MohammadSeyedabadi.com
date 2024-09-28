const allFaTags = {
  الف: ["الگوریتم"],
  ب: [],
  ت: [],
  ث: [],
  جیم: [],
  ح: [],
  خ: [],
  دال: [],
  ذال: [],
  ز: [],
  سین: [],
  شین: [],
  صاد: [],
  ضاد: [],
  طا: [],
  ظا: [],
  عین: [],
  غین: [],
  ف: ["فرانت-اند"],
  قاف: [],
  لام: [],
  میم: [],
  نون: [],
  واو: [],
  پ: [],
  چ: [],
  ژ: [],
  کاف: [],
  گاف: [],
  ی: [],
  ه: [],
  ر: ["ریکت-جی-اس"],
};

const allEnTags = {
  A: ["algorithm"],
  B: [],
  C: [],
  D: [],
  E: [],
  F: ["front-end"],
  G: [],
  H: [],
  I: [],
  J: [],
  K: [],
  L: [],
  M: [],
  N: [],
  O: [],
  P: [],
  Q: [],
  R: ["reactjs"],
  S: [],
  T: [],
  U: [],
  V: [],
  W: [],
  X: [],
  Y: [],
  Z: [],
};

export function getAllTags(locale) {
  if (locale == "en") {
    let allEnTagsCopy = JSON.parse(JSON.stringify(allEnTags)); // copy the value because of deleting in for loop
    for (const key in allEnTags) {
      if (allEnTags[key].length === 0) {
        delete allEnTagsCopy[key];
      }
    }
    return allEnTagsCopy;
  } else if (locale == "fa") {
    let allFaTagsCopy = JSON.parse(JSON.stringify(allFaTags)); // copy the value because of deleting in for loop
    for (const key in allFaTags) {
      if (allFaTags[key].length === 0) {
        delete allFaTagsCopy[key];
      }
    }
    return allFaTagsCopy;
  }
}
