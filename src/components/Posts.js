"use client";
import { useParams } from "next/navigation";
import Post from "./Post";

export default function Posts({ allPostsPreviewData }) {
  const { locale } = useParams();
  return (
      <section className="segment">
        <div className="posts">
          {allPostsPreviewData.map((eachPostPreviewData) => {
            if (locale == eachPostPreviewData.lang) {
              return (
                <Post
                  key={eachPostPreviewData.title}
                  eachPostPreviewData={eachPostPreviewData}
                />
              );
            }
          })}
        </div>
      </section>
  );
}
