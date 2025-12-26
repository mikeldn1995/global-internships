import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://global-internships.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Global Internships - Your Gateway to International Opportunities",
    template: "%s | Global Internships",
  },
  description: "Join thousands of students discovering life-changing internship opportunities in London and New York. Connect with top tech companies and launch your career with Global Internships.",
  keywords: [
    'internships',
    'tech internships',
    'London internships',
    'New York internships',
    'NYC internships',
    'student internships',
    'global internships',
    'internship opportunities',
    'international internships',
    'career opportunities',
    'student programs',
  ],
  authors: [{ name: 'Global Internships' }],
  creator: 'Global Internships',
  publisher: 'Global Internships',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Global Internships',
    title: 'Global Internships - Your Gateway to International Opportunities',
    description: 'Join thousands of students discovering life-changing internship opportunities in London and New York.',
    images: [
      {
        url: `${siteUrl}/logo.svg`,
        width: 1200,
        height: 630,
        alt: 'Global Internships Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Global Internships - Your Gateway to International Opportunities',
    description: 'Join thousands of students discovering life-changing internship opportunities in London and New York.',
    images: [`${siteUrl}/logo.svg`],
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
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: 'G-B0DDQTWEM4',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-B0DDQTWEM4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B0DDQTWEM4');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}

