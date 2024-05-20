"use client";
import { useParams } from "next/navigation";

import Post from "./Post";
import Hero from "./Hero";

export default function Posts({ allPostsMetaData }) {
  const urlLang = useParams().locale;
  return (
    <>
      <Hero title={urlLang === "fa" ? "نوشته ها" : "Writing"} />
      <section className="segment">
        <div className="posts">
          {allPostsMetaData.map((eachPostMetaData) => {
            if (urlLang == eachPostMetaData.lang) {
              return <Post key={eachPostMetaData.title} eachPostMetaData={eachPostMetaData} />;
            }
          })}
        </div>
      </section>
    </>
  );
}
