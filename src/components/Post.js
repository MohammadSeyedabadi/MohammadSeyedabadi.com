import Link from 'next/link'

export default function Post({ post }) {
  
  const { slug, title, date } = post
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <>
      <Link href={`/blog/${slug}`} className="post">
        <h3>{title}</h3>
        <time>{formattedDate}</time>
      </Link>
    </>
  )
}
