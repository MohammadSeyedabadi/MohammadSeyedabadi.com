import Link from "next/link"

export default function Heading({ title, description, slug }) {
  return (
    <h2 className="home-heading">
      <div>
        <div className="title">{title}</div>
        {description && <div className="description">{description}</div>}
      </div>
      {slug && (
        <Link className="button" href={slug}>
          View all
        </Link>
      )}
    </h2>
  )
}
