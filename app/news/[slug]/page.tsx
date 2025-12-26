'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image_url: string;
  published_date: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.slug) {
      fetch(`/api/blogs/${params.slug}`)
        .then((res) => res.json())
        .then((data) => {
          setBlog(data.blog);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching blog:', err);
          setLoading(false);
        });
    }
  }, [params.slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading article...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!blog) {
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

  return (
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
            {blog.image_url && (
              <div className="relative h-64 sm:h-96 w-full">
                <Image
                  src={blog.image_url}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="p-6 sm:p-8 lg:p-12">
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-4">
                  {formatDate(blog.published_date)}
                </p>
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
  );
}

