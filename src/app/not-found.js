import Link from "next/link";
export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <div className="container" style={{ textAlign: "center" }}>
          <h1>Could not find the requested page.</h1>
          <Link href="/en" style={{ color: "#5a43f1" }}>
            Go to home page
          </Link>
        </div>
      </body>
    </html>
  );
}
