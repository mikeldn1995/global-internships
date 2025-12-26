import { MetadataRoute } from 'next';
import { query, initDatabase } from '@/lib/db';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://global-internships.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await initDatabase();
  
  // Get all blogs
  const blogsResult = await query('SELECT slug, updated_at, published_date FROM blogs ORDER BY published_date DESC');
  const blogs = blogsResult.rows.map((blog) => ({
    url: `${siteUrl}/news/${blog.slug}`,
    lastModified: new Date(blog.updated_at || blog.published_date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Static pages
  const staticPages = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${siteUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ];

  return [...staticPages, ...blogs];
}

