import { useContext } from 'react'
import ThemeContext from '@/store/theme-context'
import Image from 'next/image'
import Link from 'next/link'

export default function PostSidebar({ post }) {
  const { ariaActive } = useContext(ThemeContext)
  const { title, slug, image, date } = post

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <aside className="post-sidebar">
      <div className="post-image">
        <Image
          src={`/images/posts/${slug}/${image}`}
          width={150}
          height={150}
          alt={title}
        />
      </div>

      <div className="post-sidebar-card">
        <h2>About me</h2>
        {ariaActive == true ? (
          <Image
            src="/images/me2.jpg"
            width={256}
            height={256}
            alt="Mohammad"
            className="sidebar-avatar"
            quality={100}
          />
        ) : (
          <Image
            src="/images/me1.jpg"
            width={256}
            height={256}
            alt="Mohammad"
            className="sidebar-avatar"
            quality={100}
          />
        )}
        <p>
          Hello and thanks for visiting! My name is{' '}
          <Link href="/me">Mohammad seyedabadi</Link>, and this is my website
          and digital garden.
        </p>
        <p>
          I'm a software developer who creates open-source projects and writes
          about code. This site is and has always been free of ads, trackers,
          social media, affiliates, and sponsored posts.
        </p>
      </div>

      <div className="post-sidebar-card">
        <h2>Post Details</h2>
        <ul>
          <li>Published {formattedDate}</li>
        </ul>

        <div>
          <h2>Category</h2>
          <ul>
            <li>
              <Link href="/">Front end</Link>
            </li>
          </ul>
        </div>

        <h2>Tags</h2>
        <div className="tags">
          <Link href="/" className="tag">
            redux
          </Link>
        </div>
      </div>

      <div className="post-sidebar-card">
        <h2>Newsletter</h2>
        <p>
          Get updates when I write something new! No spam, I respect your inbox.
        </p>
        <p>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="button highlighted"
          >
            Subscribe to the Newsletter
          </a>
        </p>
      </div>
    </aside>
  )
}
