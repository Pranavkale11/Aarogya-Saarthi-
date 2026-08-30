import React from 'react';
import { useParams } from 'react-router-dom';
import { SimulationContainer } from '../components/SimulationContainer';
import { ChatbotPanel } from '../components/ChatbotPanel';

export const Prevention = () => {
  const { diseaseId } = useParams();

  if (!diseaseId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-8 text-center">Select a Disease</h1>
          {/* DiseaseSelector component would go here */}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center capitalize">{diseaseId} Prevention</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Simulation - Main Content */}
          <div className="lg:col-span-2">
            <SimulationContainer disease={diseaseId} />
          </div>

          {/* Chatbot - Sidebar */}
          <div>
            <h3 className="text-xl font-bold mb-4">Expert Assistant</h3>
            <ChatbotPanel disease={diseaseId} />
          </div>
        </div>
      </div>
    </div>
  );
};
