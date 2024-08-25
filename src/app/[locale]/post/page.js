import { sql } from "@vercel/postgres";

export default async function page() {
  const data = await fetchAllNotesTitles();
  console.log(data)
  return <div>hello</div>;
}

async function fetchAllNotesTitles() {
  try {
    const data = await sql`SELECT * FROM invoices`;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch all notes titles.");
  }
}
