import React, { useState } from 'react';
import healthSchemes from '../data/healthSchemes.json';

export const HealthSchemes = () => {
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const schemes = healthSchemes.schemes;

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (selectedScheme) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => setSelectedScheme(null)}
            className="mb-6 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-all"
          >
            ← Back to Schemes
          </button>

          {/* Detailed Card */}
          <div className={`${selectedScheme.color} rounded-2xl shadow-2xl p-10 text-white`}>
            {/* Header */}
            <div className="mb-8">
              <div className="text-7xl mb-4">{selectedScheme.icon}</div>
              <h1 className="text-4xl font-bold mb-3">{selectedScheme.name}</h1>
              <p className="text-lg opacity-90">{selectedScheme.ministry}</p>
              <div className="mt-4 text-sm bg-white bg-opacity-20 inline-block px-4 py-2 rounded-full">
                Coverage: {selectedScheme.coverage}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8 border-b border-white border-opacity-30 pb-8">
              <p className="text-lg leading-relaxed">{selectedScheme.description}</p>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Eligibility */}
              <div>
                <h3 className="text-2xl font-bold mb-4">Who Can Benefit?</h3>
                <ul className="space-y-3">
                  {selectedScheme.eligibility.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-2xl mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-2xl font-bold mb-4">Key Benefits</h3>
                <ul className="space-y-3">
                  {selectedScheme.benefits.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-2xl mt-1">★</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white border-opacity-30">
              <a
                href={selectedScheme.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-white text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-all text-center"
              >
                📱 Visit Official Website
              </a>
              <button
                onClick={() => {
                  // For offline feature - could show offline info
                  alert(`Scheme: ${selectedScheme.name}\nSave this info for offline access`);
                }}
                className="flex-1 bg-white bg-opacity-30 font-bold py-3 px-6 rounded-lg hover:bg-opacity-40 transition-all text-center border border-white"
              >
                💾 Save for Offline
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-8">
        <h1 className="text-4xl font-bold text-center mb-2">Government Health Schemes</h1>
        <p className="text-center text-blue-100">Discover all benefits available for you</p>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search schemes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 text-lg"
          />
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
            <div
              key={scheme.id}
              onClick={() => setSelectedScheme(scheme)}
              className={`${scheme.color} rounded-xl shadow-lg p-6 text-white cursor-pointer hover:shadow-2xl transform hover:scale-105 transition-all`}
            >
              <div className="text-5xl mb-4">{scheme.icon}</div>
              <h3 className="text-xl font-bold mb-2">{scheme.name}</h3>
              <p className="text-sm mb-4 opacity-90">{scheme.summary}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-white bg-opacity-30 px-3 py-1 rounded-full">
                  {scheme.ministry}
                </span>
                <span className="text-lg">→</span>
              </div>
            </div>
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No schemes found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};
