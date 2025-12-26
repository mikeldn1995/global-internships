'use client';

import { useEffect, useState } from 'react';

const UNIVERSITIES = [
  'University of Oxford',
  'Columbia University',
  'Imperial College London',
  'New York University',
  'University of Cambridge',
  'Cornell University',
  'London School of Economics',
  'Fordham University',
  'University College London',
  'The New School',
  'King\'s College London',
  'Baruch College',
  'Queen Mary University of London',
  'Hunter College',
  'City, University of London',
  'Pace University',
  'University of Westminster',
  'St. John\'s University',
  'Brunel University London',
  'CUNY Graduate Center',
];

export default function UniversityCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % UNIVERSITIES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden bg-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-600 mb-4">
          Our interns come from leading universities in London and New York including:
        </p>
        <div className="flex items-center justify-center min-h-[60px]">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 transition-all duration-500">
              {UNIVERSITIES[currentIndex]}
            </h3>
          </div>
        </div>
        <div className="flex justify-center mt-4 gap-2">
          {UNIVERSITIES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-blue-600'
                  : 'w-2 bg-gray-300'
              }`}
              aria-label={`Go to ${UNIVERSITIES[index]}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

