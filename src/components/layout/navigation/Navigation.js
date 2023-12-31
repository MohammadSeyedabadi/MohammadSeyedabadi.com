import Link from 'next/link'
import { useRouter } from 'next/router';
import Toggle from './Toggle'

export default function Navigation() {
  const router = useRouter();
  const { pathname } = router
  
  return (
    <header className="navigation container" id="navigation">
      <nav className="nav--container">
        <span className="nav-tog">
          <Toggle />
        </span>

        <div className="nav--menu nav--list" id="nav-menu">
          <span className={pathname == '/' ? "active--link" : ""}>
            <Link href="/" className="nav--link nav--home ">
              <span className="nav__name">Home</span>
            </Link>
          </span>
          <span className={pathname == '/me' ? "active--link" : ""}>
            <Link href="/me" className="nav--link nav--about">
              <span className="nav__name">About</span>
            </Link>
          </span>

          <span className={pathname == '/projects' ? "active--link" : ""}>
            <Link href="/projects" className="nav--link nav--projects">
              <span className="nav__name">Projects</span>
            </Link>
          </span>
          <span className={pathname == '/contact' ? "active--link" : ""}>
            <Link href="/contact" className="nav--link nav--contact">
              <span className="nav__name">Contact</span>
            </Link>
          </span>

          <span className={pathname == '/blog' ? "active--link" : ""}>
            <Link href="/blog" className="nav--link nav--blog">
              <span className="nav__name">Blog</span>
            </Link>
          </span>
        </div>
      </nav>
    </header>
  )
}
