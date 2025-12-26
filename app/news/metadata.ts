import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://global-internships.com';

export const metadata: Metadata = {
  title: 'News & Events - Global Internships',
  description: 'Stay updated with our latest events and activities in London and New York. Read about our participation in tech conferences, networking events, and internship opportunities.',
  keywords: [
    'internship news',
    'tech events',
    'London tech events',
    'NYC tech events',
    'internship updates',
    'global internships news',
    'student opportunities',
  ].join(', '),
  openGraph: {
    title: 'News & Events | Global Internships',
    description: 'Stay updated with our latest events and activities in London and New York.',
    url: `${siteUrl}/news`,
    siteName: 'Global Internships',
    images: [
      {
        url: `${siteUrl}/logo.svg`,
        width: 1200,
        height: 630,
        alt: 'Global Internships News',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'News & Events | Global Internships',
    description: 'Stay updated with our latest events and activities in London and New York.',
    images: [`${siteUrl}/logo.svg`],
  },
  alternates: {
    canonical: `${siteUrl}/news`,
  },
};

