'use client';

import { useState } from 'react';
import Image from 'next/image';
import SignupWizard from '@/components/SignupWizard';
import UniversityCarousel from '@/components/UniversityCarousel';
import CompanyCarousel from '@/components/CompanyCarousel';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Home() {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = () => {
    setShowSuccess(true);
  };

  // Structured data for SEO
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://global-internships.com';
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Global Internships',
    url: siteUrl,
    logo: `${siteUrl}/logo.svg`,
    description: 'Connect students with life-changing internship opportunities in London and New York.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'London',
      addressCountry: 'GB',
    },
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'contact@global-internships.com',
    },
  };


  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-3 sm:p-4">
        <div className="max-w-2xl w-full bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12 text-center">
          <div className="mb-4 sm:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
              Application Submitted Successfully!
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-2">
              Thank you for your interest in Global Internships.
            </p>
            <p className="text-sm sm:text-base text-gray-600">
              We've sent a confirmation email to your inbox. Our team will review your application
              and get back to you within 5-7 business days with personalized internship
              opportunities.
            </p>
          </div>
          <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-blue-50 rounded-lg">
            <p className="text-sm sm:text-base text-gray-700 mb-2">
              <strong>What's next?</strong>
            </p>
            <ul className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600 text-left space-y-2 max-w-md mx-auto">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Check your email for confirmation</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Our team will review your profile</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>You'll receive personalized recommendations</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Structured data for SEO
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://global-internships.com';
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Global Internships',
    url: siteUrl,
    logo: `${siteUrl}/logo.svg`,
    description: 'Connect students with life-changing internship opportunities in London and New York.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'London',
      addressCountry: 'GB',
    },
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'contact@global-internships.com',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <Header scrollToWizard={scrollToWizard} scrollToTop={scrollToTop} />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Your Gateway to{' '}
                <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  Global Tech Internships
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Join students from leading universities in London and New York securing life-changing
                internship opportunities at the world's top tech companies. Experience the best of
                both cities—London's innovation hub and NYC's tech ecosystem.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start mb-6 sm:mb-8">
                <div className="flex items-center text-gray-700 text-sm sm:text-base">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>London & NYC</span>
                </div>
                <div className="flex items-center text-gray-700 text-sm sm:text-base">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Top Tech Companies</span>
                </div>
                <div className="flex items-center text-gray-700 text-sm sm:text-base">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Leading Universities</span>
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative h-64 sm:h-80 lg:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80"
                alt="London and New York city skylines"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* University Carousel */}
      <UniversityCarousel />

      {/* Company Carousel */}
      <CompanyCarousel />

      {/* Features Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            Why Choose Global Internships?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-4 sm:p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">London & NYC</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Exclusive access to internships at leading tech companies in London and New York.
              </p>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Personalized Matching</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Our system matches you with opportunities that align with your goals and background.
              </p>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Expert Support</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Get guidance from our experienced team throughout your internship journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Signup Form Section */}
      <section id="signup-wizard" className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-blue-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-2">
              Fill out the form below and our team will match you with the perfect internship
              opportunities in London and New York.
            </p>
          </div>
          <SignupWizard onSuccess={handleSuccess} />
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
}

