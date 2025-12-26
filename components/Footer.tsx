'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="md:col-span-2">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Global Internships</h3>
            <p className="text-sm sm:text-base text-gray-400 mb-3">
              Connecting students with life-changing internship opportunities at top tech companies in London and New York.
            </p>
            <div className="text-sm text-gray-400 space-y-2">
              <div>
                <p className="font-medium text-gray-300 mb-1">London Office</p>
                <p className="mb-1">123 Canary Wharf</p>
                <p className="mb-1">London, E14 5AB</p>
                <p>United Kingdom</p>
              </div>
              <div className="mt-3">
                <p className="font-medium text-gray-300 mb-1">New York Office</p>
                <p className="mb-1">456 Broadway, Suite 1200</p>
                <p className="mb-1">New York, NY 10013</p>
                <p>United States</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact</h3>
            <p className="text-sm sm:text-base text-gray-400 mb-2">
              Email:{' '}
              <Link
                href="/contact"
                className="text-blue-400 hover:text-blue-300 transition"
              >
                contact@global-internships.com
              </Link>
            </p>
            <Link
              href="/contact"
              className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition text-sm"
            >
              Contact Us
            </Link>
          </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Legal</h3>
              <div className="flex flex-col space-y-2">
                <Link href="/terms" className="text-sm sm:text-base text-gray-400 hover:text-white transition">
                  Terms and Conditions
                </Link>
                <Link href="/privacy" className="text-sm sm:text-base text-gray-400 hover:text-white transition">
                  Privacy Policy
                </Link>
                <Link href="/admin/login" className="text-sm sm:text-base text-gray-400 hover:text-white transition">
                  Admin Login
                </Link>
              </div>
            </div>
        </div>
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Global Internships. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

