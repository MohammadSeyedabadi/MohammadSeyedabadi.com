"use client";
import { usePathname } from "next/navigation";
import Post from "./Post";

export default function Posts({ allPostsPreviewData }) {
  const url = usePathname().split("/");
  return (
    <section className="segment">
      <div className="posts">
        {allPostsPreviewData.map((eachPostPreviewData) => {
          if (url[1] == eachPostPreviewData.lang) {
            return (
              <Post
                key={eachPostPreviewData.title}
                eachPostPreviewData={eachPostPreviewData}
                page={url[2]}
              />
            );
          }
        })}
      </div>
    </section>
  );
}
