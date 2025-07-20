import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const locales = ['en', 'fa'];
  return locales.map((locale) => ({ locale }));
}


export default function CatchAllPage() {
  notFound();
}
