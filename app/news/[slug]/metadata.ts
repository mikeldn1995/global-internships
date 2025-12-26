import { Metadata } from 'next';
import { query, initDatabase } from '@/lib/db';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://global-internships.com';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  await initDatabase();
  const result = await query('SELECT * FROM blogs WHERE slug = $1', [params.slug]);
  
  if (result.rows.length === 0) {
    return {
      title: 'Blog Post Not Found | Global Internships',
      description: 'The blog post you are looking for could not be found.',
    };
  }

  const blog = result.rows[0];
  const imageUrl = blog.image_url || `${siteUrl}/logo.svg`;
  const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `${siteUrl}${imageUrl}`;

  return {
    title: `${blog.title} | Global Internships`,
    description: blog.excerpt || `Read about ${blog.title} and discover internship opportunities in London and New York.`,
    keywords: [
      'internships',
      'tech internships',
      'London internships',
      'New York internships',
      'student internships',
      'global internships',
      'internship opportunities',
      blog.title.toLowerCase(),
    ].join(', '),
    authors: [{ name: 'Global Internships' }],
    openGraph: {
      title: blog.title,
      description: blog.excerpt || `Read about ${blog.title} and discover internship opportunities.`,
      url: `${siteUrl}/news/${blog.slug}`,
      siteName: 'Global Internships',
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: blog.published_date,
      modifiedTime: blog.updated_at || blog.published_date,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt || `Read about ${blog.title} and discover internship opportunities.`,
      images: [fullImageUrl],
    },
    alternates: {
      canonical: `${siteUrl}/news/${blog.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

