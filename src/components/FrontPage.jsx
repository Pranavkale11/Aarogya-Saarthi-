import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/store';

export const FrontPage = () => {
  const navigate = useNavigate();
  const { completedSimulations } = useAppStore();

  const menuItems = [
    {
      id: 'prevention',
      title: 'Disease Prevention',
      icon: '🏥',
      description: 'Learn with AI-powered simulations',
      color: 'from-green-400 to-emerald-600',
      route: '/prevention',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 'emergency',
      title: 'Emergency Aid',
      icon: '🚨',
      description: 'Life-saving first aid guides',
      color: 'from-red-400 to-rose-600',
      route: '/emergency',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 'schemes',
      title: 'Health Schemes',
      icon: '📋',
      description: 'Government health benefits',
      color: 'from-teal-400 to-cyan-600',
      route: '/schemes',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: '⚙️',
      description: 'Customize your experience',
      color: 'from-purple-400 to-indigo-600',
      route: '/settings',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    }
  ];

  return (
    <div className="min-h-screen animated-gradient">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl float-animation"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 opacity-10 rounded-full blur-3xl float-animation" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header with Glass Effect */}
      <div className="relative glass text-white p-8 mb-12">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-100">
            Aarogya Saarthi
          </h1>
          <p className="text-xl opacity-90 font-light">
            आपका स्वास्थ्य साथी • Your AI Health Companion
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full pulse-glow"></div>
            <span className="text-sm">Offline Ready</span>
          </div>
        </div>
      </div>

      {/* Main Menu Cards */}
      <div className="container mx-auto px-6 pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => navigate(item.route)}
              className="group glass-card rounded-3xl p-8 cursor-pointer hover-lift overflow-hidden relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Gradient on Hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{ background: item.gradient }}
              ></div>

              {/* Icon with Animation */}
              <div className="text-7xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>

              {/* Content */}
              <h2 className="text-3xl font-bold mb-3 text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all">
                {item.title}
              </h2>
              <p className="text-gray-600 text-base mb-4">
                {item.description}
              </p>

              {/* Arrow Icon */}
              <div className="flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-4 transition-all">
                <span>Explore</span>
                <span className="text-2xl">→</span>
              </div>

              {/* Shimmer Effect on Hover */}
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        {completedSimulations.length > 0 && (
          <div className="mt-16 text-center glass-card rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Your Progress</h3>
            <div className="flex justify-around">
              <div>
                <div className="text-4xl font-bold text-purple-600">{completedSimulations.length}</div>
                <div className="text-gray-600">Completed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600">{completedSimulations.length * 10}</div>
                <div className="text-gray-600">Points</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="relative glass text-white text-center py-6 mt-12">
        <p className="opacity-90">Building healthier rural India, one village at a time 🇮🇳</p>
      </div>
    </div>
  );
};
