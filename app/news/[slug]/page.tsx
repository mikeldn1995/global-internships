import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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

interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image_url: string;
  published_date: string;
  updated_at?: string;
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  await initDatabase();
  const result = await query('SELECT * FROM blogs WHERE slug = $1', [params.slug]);
  
  if (result.rows.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
            <Link
              href="/news"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Back to News
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const blog: Blog = result.rows[0];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const imageUrl = blog.image_url || `${siteUrl}/logo.svg`;
  const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `${siteUrl}${imageUrl}`;
  
  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt || blog.title,
    image: fullImageUrl,
    datePublished: blog.published_date,
    dateModified: blog.updated_at || blog.published_date,
    author: {
      '@type': 'Organization',
      name: 'Global Internships',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Global Internships',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/news/${blog.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col">
        <Header />

        <main className="flex-grow py-8 sm:py-12">
          <article className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8">
            <Link
              href="/news"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to News
            </Link>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {fullImageUrl && (
                <div className="relative h-64 sm:h-96 w-full">
                  <Image
                    src={fullImageUrl}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  />
                </div>
              )}

              <div className="p-6 sm:p-8 lg:p-12">
                <div className="mb-6">
                  <time dateTime={blog.published_date} className="text-sm text-gray-500 mb-4 block">
                    {formatDate(blog.published_date)}
                  </time>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    {blog.title}
                  </h1>
                  {blog.excerpt && (
                    <p className="text-xl text-gray-600 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  )}
                </div>

                <div
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-strong:text-gray-900"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/news"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                View All News
              </Link>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
}
