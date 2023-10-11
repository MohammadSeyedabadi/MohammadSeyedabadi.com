import Link from 'next/link'

export default function Post() {
  return (
    <>
      <Link href="/" className="post">
        <h3>My first blog</h3>
        <time>Feb 15</time>
      </Link>
    </>
  )
}
