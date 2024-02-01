import Head from "next/head";
import { getPostData, getPostsFiles } from "@/@/utils/posts-util";
import PostTemplate from "@/@/templates/post";
import config from "@/@/utils/config";

export const metadata = {
  title: `${props.post.title} | ${config.siteTitle}`,
  description: props.post.excerpt,
};

export default function PostDetailPage(props) {
  return (
    <>
      <PostTemplate post={props.post} />
    </>
  );
}

export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    //revalidate: 600, // here is good to have revalidate because it is not a waste because it is only one post and if we change one post in will automatically re bluid and re deploy after the amount of time we specified
  };
}

export function getStaticPaths() {
  // we are pre generaing this single post page for all our posts in advance
  const postFilenames = getPostsFiles();

  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}
