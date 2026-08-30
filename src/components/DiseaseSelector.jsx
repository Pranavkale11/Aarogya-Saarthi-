import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/store';
import diseases from '../data/diseases.json';

export const DiseaseSelector = () => {
  const navigate = useNavigate();
  const { selectDisease, startSimulation, completedSimulations } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['all', ...new Set(diseases.diseases.map(d => d.category))];

  const filteredDiseases = diseases.diseases.filter(disease => {
    const matchesCategory = selectedCategory === 'all' || disease.category === selectedCategory;
    const matchesSearch = disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disease.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelectDisease = (disease) => {
    selectDisease(disease.id);
    startSimulation(disease.id);
    navigate(`/prevention/${disease.id}`);
  };

  const isCompleted = (diseaseId) => completedSimulations.includes(diseaseId);

  return (
    <div className="min-h-screen animated-gradient">
      {/* Header */}
      <div className="glass text-white p-8 mb-8">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-2">Disease Prevention</h1>
          <p className="text-lg opacity-90">Learn through AI-powered simulations</p>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-16">
        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="glass-card rounded-full p-2 flex items-center">
            <span className="text-2xl px-4">🔍</span>
            <input
              type="text"
              placeholder="Search diseases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500 text-lg"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'glass-card text-gray-700 hover:shadow-lg'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Disease Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredDiseases.map((disease, index) => (
            <div
              key={disease.id}
              onClick={() => handleSelectDisease(disease)}
              className="glass-card rounded-3xl p-8 cursor-pointer hover-lift relative overflow-hidden group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Completion Badge */}
              {isCompleted(disease.id) && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <span>✓</span>
                  <span>Completed</span>
                </div>
              )}

              {/* Icon */}
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">
                {disease.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold mb-3 text-gray-800">
                {disease.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {disease.description}
              </p>

              {/* Category Badge */}
              <span className="inline-block bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-4 py-2 rounded-full text-xs font-semibold">
                {disease.category}
              </span>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </div>
          ))}
        </div>

        {filteredDiseases.length === 0 && (
          <div className="text-center glass-card rounded-3xl p-12 max-w-md mx-auto">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-600">No diseases found</p>
          </div>
        )}
      </div>
    </div>
  );
};
