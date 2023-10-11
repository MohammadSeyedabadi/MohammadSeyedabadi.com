import Link from 'next/link'

export default function BlogSidebar() {
  return (
    <aside className="post-sidebar">
      <div className="post-sidebar-card">
        <h2>Categories</h2>
        <div className="list">
          <Link href="/" className="category">
            <div className="name">category.name</div>
            <div className="count">1</div>
          </Link>
        </div>
      </div>

      <div className="post-sidebar-card">
        <h2>Tags</h2>
        <div className="tags">
          <Link href="/" className="tag">
            tag.name
          </Link>
        </div>
      </div>
    </aside>
  )
}
