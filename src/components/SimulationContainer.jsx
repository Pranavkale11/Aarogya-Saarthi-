import React, { useState, useEffect } from 'react';
import { useAppStore } from '../store/store';
import { SimulationEngine } from '../services/simulationEngine';
import { VoiceService } from '../services/voiceService';

export const SimulationContainer = ({ disease }) => {
  const { completeSimulation, updateSimulationProgress } = useAppStore();
  const [engine] = useState(new SimulationEngine(disease));
  const [scenario, setScenario] = useState(null);
  const [result, setResult] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadScenario = async () => {
      const firstScenario = engine.getCurrentScenario();
      setScenario(firstScenario);
      setIsLoading(false);
    };
    loadScenario();
  }, []);

  const handleChoice = (choiceIndex) => {
    const response = engine.makeChoice(choiceIndex);
    setFeedback(response);

    setTimeout(async () => {
      const nextResult = await engine.nextDay();
      
      if (nextResult.isComplete) {
        const outcome = nextResult.outcome;
        setResult(outcome);
        completeSimulation(disease);
        updateSimulationProgress(disease, outcome.score);
      } else {
        setScenario(nextResult.scenario);
        setFeedback(null);
      }
    }, 2000);
  };

  if (isLoading) {
    return <div className="text-center p-8">Loading simulation...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
      <div className="max-w-2xl mx-auto">
        {!result ? (
          <>
            {/* Current Scenario */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
              <h2 className="text-2xl font-bold mb-6">{scenario?.description}</h2>

              {/* Health Bar */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Health: {engine.health}%</span>
                  <span className="text-sm text-gray-600">Risk: {engine.riskLevel}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full transition-all ${
                      engine.health > 70 ? 'bg-green-500' :
                      engine.health > 40 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${engine.health}%` }}
                  />
                </div>
              </div>

              {/* Choices */}
              <div className="space-y-3">
                {scenario?.choices.map((choice, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleChoice(idx)}
                    disabled={feedback !== null}
                    className="w-full p-4 text-left bg-blue-50 border-2 border-blue-300 rounded-lg hover:bg-blue-100 disabled:opacity-50 transition-all"
                  >
                    <span className="font-semibold text-blue-700">{choice.text}</span>
                  </button>
                ))}
              </div>

              {/* Feedback */}
              {feedback && (
                <div className="mt-6 p-4 bg-blue-100 border-l-4 border-blue-500 rounded">
                  <p className="text-blue-800">{feedback.feedback}</p>
                </div>
              )}
            </div>

            {/* Day Counter */}
            <div className="text-center text-gray-600">
              Day {engine.currentDay} of 7
            </div>
          </>
        ) : (
          /* Result Screen */
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">{result.icon}</div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">{result.status}</h2>
            <p className="text-xl text-gray-600 mb-6">{result.message}</p>
            <div className="mb-8">
              <div className="text-5xl font-bold text-purple-600">{result.score}%</div>
              <p className="text-gray-600 mt-2">Your Score</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
