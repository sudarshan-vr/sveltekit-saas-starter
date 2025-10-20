import { WebsiteBaseUrl } from "../../config"
import { sortedBlogPosts } from "../(marketing)/blog/posts"

type SitemapPage = {
  url: string
  changefreq: string
  priority: number
  lastmod?: string
}

export async function GET() {
  const pages: SitemapPage[] = [
    {
      url: "",
      changefreq: "daily",
      priority: 1.0,
    },
    {
      url: "/themes",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/pricing",
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      url: "/blog",
      changefreq: "daily",
      priority: 0.9,
    },
  ]

  // Add blog posts to sitemap
  const blogPages: SitemapPage[] = sortedBlogPosts.map((post) => ({
    url: post.link,
    changefreq: "monthly",
    priority: 0.7,
    lastmod: post.parsedDate?.toISOString().split("T")[0],
  }))

  const allPages: SitemapPage[] = [...pages, ...blogPages]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${WebsiteBaseUrl}${page.url}</loc>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ""}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "max-age=0, s-maxage=3600",
    },
  })
}
