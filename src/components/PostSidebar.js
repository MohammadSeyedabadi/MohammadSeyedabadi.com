import Image from "next/image"

export default function PostSidebar({post}) {
    const {title, slug, image, date, content} = post
    let mytest = `/images/posts/${slug}/${image}`
    console.log(mytest,"here")
  return (
    <>
        <Image src={`/images/posts/${slug}/${image}`} width={150} height={150} alt={title}/>
    </>
  )
}
