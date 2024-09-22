export default async function page() {
  const alltags = [
    {
      A: ["algorithm"],
      B: ["THIS IS B"],
      C: [],
      D: [],
      آ: ["آره شد", "به به", "دیوار", "آسمان", "اصغر"],
    },
  ];
  const faAllTags = ["فرانت-اند", "الگوریتم", "ریکت-جی-اس"];

  //   console.log(
  //     alltags[0].آ,
  //     "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  //   );
  //   console.log(alltags[0].آ.sort());
  console.log(
    faAllTags.map((tag) => {
      if (tag.startsWith("ف")) {
        console.log(tag, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        return "a";
      } else {
        return "b";
      }
    })
  );
  return <></>;
}
