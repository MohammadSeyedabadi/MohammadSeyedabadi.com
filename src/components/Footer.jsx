import {useTranslations} from 'next-intl';
export default function Footer() {
  const t = useTranslations('Footer');
  const links = [
    {
      url: "https://www.linkedin.com/in/mohammad-seyedabadi-397a61256/",
      label: t('LinkedIn'),
      icon: "/images/nav-linkedin.png",
    },
    {
      url: "https://github.com/MohammadSeyedabadi",
      label: t('GitHub'),
      icon: "/images/nav-github.png",
    },
  ];

  return (
    <footer className="footer">
      <section>
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
  );
}
