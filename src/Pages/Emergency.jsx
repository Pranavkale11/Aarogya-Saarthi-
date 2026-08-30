import React, { useState } from 'react';
import emergencyData from '../data/emergencyGuides.json';

export const Emergency = () => {
  const [selectedEmergency, setSelectedEmergency] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
        <h1 className="text-3xl font-bold text-center">Emergency First Aid Guides</h1>
      </div>

      <div className="container mx-auto p-6">
        {!selectedEmergency ? (
          // Emergency Selection
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {emergencyData.emergencies.map((emergency) => (
              <button
                key={emergency.id}
                onClick={() => setSelectedEmergency(emergency)}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transform hover:scale-105 transition-all text-left"
              >
                <div className="text-5xl mb-4">{emergency.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{emergency.title}</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  emergency.severity === 'critical' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {emergency.severity}
                </span>
              </button>
            ))}
          </div>
        ) : (
          // Emergency Guide
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
            <button
              onClick={() => setSelectedEmergency(null)}
              className="mb-6 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              ← Back
            </button>

            <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="text-5xl">{selectedEmergency.icon}</span>
              {selectedEmergency.title}
            </h1>

            {/* Steps */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Emergency Steps</h2>
              <div className="space-y-4">
                {selectedEmergency.steps.map((step, idx) => (
                  <div key={idx} className="border-l-4 border-red-500 pl-4 py-2">
                    <h3 className="text-lg font-bold text-red-600">Step {step.step}: {step.action}</h3>
                    <p className="text-gray-700 mt-2">{step.instructions}</p>
                    <p className="text-sm text-gray-600 mt-1">Duration: {step.duration}</p>
                    <p className="text-red-600 font-semibold mt-2">⚠️ {step.warning}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Myths */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Common Myths</h2>
              <div className="space-y-4">
                {selectedEmergency.myths.map((myth, idx) => (
                  <div key={idx} className="bg-red-50 p-4 rounded-lg">
                    <p className="text-red-700 font-semibold mb-2">❌ Myth: {myth.myth}</p>
                    <p className="text-green-700 font-semibold">✅ Truth: {myth.truth}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
