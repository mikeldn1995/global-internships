'use client';

import { useEffect, useState } from 'react';

const TECH_COMPANIES = [
  'Google',
  'Amazon',
  'Microsoft',
  'Meta',
  'Apple',
  'Bloomberg',
  'Goldman Sachs',
  'JPMorgan Chase',
  'Morgan Stanley',
  'Revolut',
  'Monzo',
  'Deliveroo',
  'TransferWise',
  'DeepMind',
  'Palantir',
  'Improbable',
  'Darktrace',
  'Benevolent AI',
  'Spotify',
  'Etsy',
];

export default function CompanyCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TECH_COMPANIES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden bg-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-600 mb-4">
          Our interns have secured placements at leading tech companies in London and New York including:
        </p>
        <div className="flex items-center justify-center min-h-[60px]">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 transition-all duration-500">
              {TECH_COMPANIES[currentIndex]}
            </h3>
          </div>
        </div>
        <div className="flex justify-center mt-4 gap-2">
          {TECH_COMPANIES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-blue-600'
                  : 'w-2 bg-gray-300'
              }`}
              aria-label={`Go to ${TECH_COMPANIES[index]}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

