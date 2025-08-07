import { apiPublicUrl } from "@/constants";
import { Book } from "@amen24/shared";

export async function GET() {
  const baseUrl = "https://amen24.org";
  const staticRoutes = [
    "",
    "/bible",
    "/search",
    "/contact-us",
    "/privacy",
    "/terms",
  ];

  const locales = ["en", "ar"];
  const lastModified = new Date().toISOString();

  const response = await fetch(`${apiPublicUrl}/books`);
  if (!response.ok) {
    return new Response("Failed to fetch books", { status: 500 });
  }

  const books: Book[] = await response.json();

  const allRoutes = [
    ...staticRoutes.flatMap((path) =>
      locales.map((locale) => ({
        url: `${baseUrl}/${locale}${path}`,
        lastModified,
      }))
    ),
    ...books.flatMap((book) =>
      locales.map((locale) => ({
        url: `${baseUrl}/${locale}/bible/${book.bookKey}/1`,
        lastModified,
      }))
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `<url>
  <loc>${route.url}</loc>
  <lastmod>${route.lastModified}</lastmod>
</url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
