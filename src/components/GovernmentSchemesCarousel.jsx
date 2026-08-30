import React, { useState, useRef, useEffect } from 'react';
import healthSchemes from '../data/healthSchemes.json';

export const GovernmentSchemesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const carouselRef = useRef(null);

  const schemes = healthSchemes.schemes;

  // Handle touch/mouse start
  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.type.includes('mouse') ? e.clientX : e.touches[0].clientX);
    setCurrentX(startX);
  };

  // Handle touch/mouse move
  const handleDragMove = (e) => {
    if (!isDragging) return;
    const x = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    setCurrentX(x);
  };

  // Handle touch/mouse end
  const handleDragEnd = () => {
    setIsDragging(false);
    const diff = startX - currentX;
    const threshold = 50;

    if (diff > threshold) {
      // Swiped left - go to next
      nextSlide();
    } else if (diff < -threshold) {
      // Swiped right - go to previous
      previousSlide();
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % schemes.length);
  };

  const previousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? schemes.length - 1 : prevIndex - 1
    );
  };

  const currentScheme = schemes[currentIndex];

  return (
    <div className="w-full bg-gradient-to-r from-teal-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Government Health Schemes
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Discover benefits available for you • Swipe to explore
        </p>

        {/* Carousel Container */}
        <div className="flex items-center justify-center gap-4">
          {/* Previous Button */}
          <button
            onClick={previousSlide}
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all hover:scale-110 z-10"
            aria-label="Previous scheme"
          >
            <span className="text-2xl">❮</span>
          </button>

          {/* Card Container */}
          <div
            ref={carouselRef}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            className="flex-1 max-w-2xl cursor-grab active:cursor-grabbing"
          >
            {/* Scheme Card */}
            <div
              className={`${currentScheme.color} rounded-2xl shadow-2xl p-8 text-white min-h-96 flex flex-col justify-between transition-all duration-300 transform hover:scale-105`}
            >
              {/* Header */}
              <div className="mb-6">
                <div className="text-6xl mb-4">{currentScheme.icon}</div>
                <h3 className="text-3xl font-bold mb-2">{currentScheme.name}</h3>
                <p className="text-xs opacity-90">{currentScheme.ministry}</p>
              </div>

              {/* Summary */}
              <div className="mb-6">
                <p className="text-lg leading-relaxed">
                  {currentScheme.summary}
                </p>
              </div>

              {/* Key Benefits (Quick View) */}
              <div className="mb-6">
                <h4 className="font-bold text-sm mb-2">Key Benefits:</h4>
                <div className="flex flex-wrap gap-2">
                  {currentScheme.benefits.slice(0, 3).map((benefit, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-white bg-opacity-30 px-3 py-1 rounded-full"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer with CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-white border-opacity-30">
                <span className="text-sm font-semibold opacity-90">
                  {currentIndex + 1} / {schemes.length}
                </span>
                <a
                  href={currentScheme.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-gray-800 font-bold px-6 py-2 rounded-full hover:bg-gray-100 transition-all transform hover:scale-110"
                >
                  Learn More →
                </a>
              </div>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all hover:scale-110 z-10"
            aria-label="Next scheme"
          >
            <span className="text-2xl">❯</span>
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {schemes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex
                  ? 'bg-gray-800 w-8'
                  : 'bg-gray-400 hover:bg-gray-600'
              }`}
              aria-label={`Go to scheme ${idx + 1}`}
            />
          ))}
        </div>

        {/* Swipe Instruction for Mobile */}
        <div className="text-center mt-6 md:hidden">
          <p className="text-sm text-gray-600">👆 Swipe left or right to explore more schemes</p>
        </div>
      </div>
    </div>
  );
};
