import React from 'react';

export const ProgressTracker = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Progress Tracker</h1>
        <p className="text-gray-600">Track your learning progress and simulation history here.</p>
        <div className="mt-8 p-6 bg-white rounded-lg shadow">
          <p className="text-gray-500">No progress yet. Start a simulation to see progress here.</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
