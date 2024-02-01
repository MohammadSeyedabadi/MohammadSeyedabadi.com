import PostTemplate from "@/templates/post";
import { getAllPosts, getPostData } from "@/utils/posts-util";

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default function Page({ params }) {
  // params also contains => locale
  const { slug, locale } = params;
  const postData = getPostData(slug, locale);

  return (
    <>
      <PostTemplate post={postData} />
    </>
  );
}
