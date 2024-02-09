"use client";
import { useParams } from "next/navigation";

import Post from "./Post";

export default function Posts({ allPosts }) {
  const urlLang = useParams().locale;

  //   const { date } = allPosts[0]
  //   const formattedDate = new Date(date).toLocaleDateString('en-US', {
  //     year: 'numeric',
  //   })

  return (
    <>
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
