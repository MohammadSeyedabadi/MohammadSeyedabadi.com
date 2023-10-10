export default function Footer() {
  const links = [
    {
      url: 'https://github.com/MohammadSeyedabadi',
      label: 'GitHub',
      icon:'/images/nav-github.png',
    },
    {
      url: 'https://www.linkedin.com/in/mohammad-seyedabadi-397a61256/',
      label: 'LinkedIn',
      icon:'/images/nav-linkedin.png',
    },
  ]

  return (
    <footer className="footer">
      <section>
        <span>Thanks for reading!</span>
        <nav>
          {links.map((link) => (
            <a
              href={link.url}
              title={link.label}
              target="_blank"
              rel="noopener noreferrer"
              key={link.url}
            >
              <span>{link.label}</span>
              <img src={link.icon} alt={link.label} />
            </a>
          ))}
        </nav>
      </section>
    </footer>
  )
}
