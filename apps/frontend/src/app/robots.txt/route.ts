export async function GET() {
  const content = `
    User-agent: *
    Allow: /

    Sitemap: https://amen24.org/sitemap.xml
    `;

  return new Response(content.trim(), {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}