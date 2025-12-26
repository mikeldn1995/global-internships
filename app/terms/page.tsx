'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>
            <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <div className="prose prose-lg max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Introduction</h2>
                <p className="text-gray-700 leading-relaxed">
                  Welcome to Global Internships (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). These Terms and Conditions
                  (&quot;Terms&quot;) govern your use of our website and services. By accessing or using our
                  website, you agree to be bound by these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Services</h2>
                <p className="text-gray-700 leading-relaxed">
                  Global Internships provides internship placement services, connecting students with
                  internship opportunities in London, United Kingdom and New York, United States. We act as an intermediary
                  between students and potential employers in these global tech hubs.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Eligibility</h2>
                <p className="text-gray-700 leading-relaxed">
                  Our services are available to students currently enrolled in or recently graduated
                  from universities in the United Kingdom and the United States (particularly in the New York area). By using our services, you represent and warrant that you
                  meet these eligibility requirements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. User Obligations</h2>
                <p className="text-gray-700 leading-relaxed">
                  You agree to provide accurate, current, and complete information when using our
                  services. You are responsible for maintaining the confidentiality of your account
                  information and for all activities that occur under your account.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Limitation of Liability</h2>
                <p className="text-gray-700 leading-relaxed">
                  Global Internships acts as an intermediary service. We do not guarantee internship
                  placements, and we are not responsible for the actions, omissions, or conduct of
                  employers or third parties. Our liability is limited to the maximum extent permitted
                  by law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Intellectual Property</h2>
                <p className="text-gray-700 leading-relaxed">
                  All content on this website, including text, graphics, logos, and software, is the
                  property of Global Internships and is protected by UK and international copyright
                  laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Privacy</h2>
                <p className="text-gray-700 leading-relaxed">
                  Your use of our services is also governed by our Privacy Policy. Please review our
                  Privacy Policy to understand our practices.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Modifications</h2>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to modify these Terms at any time. Changes will be effective
                  immediately upon posting. Your continued use of our services constitutes acceptance
                  of the modified Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Contact Information</h2>
                <p className="text-gray-700 leading-relaxed">
                  For questions about these Terms, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
                  <div>
                    <p className="text-gray-700">
                      <strong>Global Internships - London Office</strong>
                      <br />
                      123 Canary Wharf
                      <br />
                      London, E14 5AB
                      <br />
                      United Kingdom
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      <strong>Global Internships - New York Office</strong>
                      <br />
                      456 Broadway, Suite 1200
                      <br />
                      New York, NY 10013
                      <br />
                      United States
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      Email: contact@global-internships.com
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Governing Law</h2>
                <p className="text-gray-700 leading-relaxed">
                  These Terms are governed by and construed in accordance with the laws of England and
                  Wales. Any disputes arising from these Terms shall be subject to the exclusive
                  jurisdiction of the courts of England and Wales.
                </p>
              </section>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-6">
            Join students from leading universities securing internships at top tech companies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#signup-wizard"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-lg"
            >
              Apply for Internship
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
