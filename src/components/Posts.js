"use client";
import { useParams } from "next/navigation";

import Post from "./Post";
import Hero from "./Hero";

export default function Posts({ allPosts }) {
  const urlLang = useParams().locale;

  //   const { date } = allPosts[0]
  //   const formattedDate = new Date(date).toLocaleDateString('en-US', {
  //     year: 'numeric',
  //   })

  return (
    <>
    <Hero title={urlLang === "fa" ? "نوشته ها" : "Writing"} />
      <section className="segment">
        {/* <h2 className="year">{formattedDate}</h2> */}
        
        <div className="posts">
          {allPosts.map((post) => {
            if (urlLang == post.lang) {
              return <Post key={post.title} post={post} />;
            }
          })}
        </div>
      </section>
    </>
  );
}
