export default function Hero({ highlight, subTitle, title, children, index }) {
  return (
    <header className={`hero ${index ? "index" : ""} col-span-3`}>
      {subTitle && (
        <div className="sub-title">
          {highlight && <span className="highlight">{highlight}</span>}
          {subTitle}
        </div>
      )}
      {title && <h1>{title}</h1>}
      {children && children}
    </header>
  );
}
