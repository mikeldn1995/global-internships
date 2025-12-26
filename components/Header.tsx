'use client';

import Link from 'next/link';

export default function Header() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToWizard = () => {
    if (typeof window !== 'undefined') {
      const wizardSection = document.getElementById('signup-wizard');
      if (wizardSection) {
        wizardSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // If on a different page, navigate to home with hash
        window.location.href = '/#signup-wizard';
      }
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            onClick={scrollToTop}
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Go to top"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="Global Internships"
              className="h-10 sm:h-12 w-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </Link>
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/news"
              className="px-4 py-2 sm:px-5 sm:py-2.5 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition text-sm sm:text-base"
            >
              News
            </Link>
            <button
              onClick={scrollToWizard}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-lg text-sm sm:text-base"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

