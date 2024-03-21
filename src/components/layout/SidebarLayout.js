import BlogSidebar from '../BlogSidebar'

export default function SidebarLayout({ children, params }) {
  return (
    <section className="container markdown-content">
      <div className="grid">
        <div className="article-content">{children}</div>
        <div className="sidebar-content">
          <BlogSidebar params={params}/>
        </div>
      </div>
    </section>
  )
}
