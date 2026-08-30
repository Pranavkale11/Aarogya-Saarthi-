import React from 'react';
import { useAppStore } from '../store/store';

export const Settings = () => {
  const { userLanguage, setLanguage, voiceEnabled, setVoiceEnabled } = useAppStore();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'mr', name: 'मराठी' },
    { code: 'ta', name: 'தமிழ்' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        {/* Language Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Language</h2>
          <div className="grid grid-cols-2 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`p-4 rounded-lg font-semibold transition-all ${
                  userLanguage === lang.code
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        {/* Voice Settings */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Voice Assistant</h2>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={voiceEnabled}
              onChange={(e) => setVoiceEnabled(e.target.checked)}
              className="w-6 h-6"
            />
            <span className="ml-3 text-gray-700">Enable voice responses</span>
          </label>
        </div>

        {/* App Info */}
        <div className="border-t pt-8">
          <h2 className="text-xl font-bold mb-4">About</h2>
          <div className="text-gray-700 space-y-2">
            <p><strong>App Name:</strong> Aarogya Saarthi</p>
            <p><strong>Version:</strong> 0.1.0</p>
            <p><strong>Tagline:</strong> Your Offline Health Companion</p>
            <p className="mt-4 text-sm text-gray-600">
              Aarogya Saarthi is designed to provide life-saving health education and emergency guidance to rural communities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
