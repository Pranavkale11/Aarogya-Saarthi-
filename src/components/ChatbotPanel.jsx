import React, { useState, useEffect, useRef } from 'react';
import { AIChatbot } from '../services/aiChatbot';
import { VoiceService } from '../services/voiceService';
import { useAppStore } from '../store/store';

export const ChatbotPanel = ({ disease }) => {
  const [messages, setMessages] = useState([]);
  const [chatbot, setChatbot] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [voiceService] = useState(new VoiceService());
  const { voiceEnabled } = useAppStore();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const initChatbot = async () => {
      setIsInitializing(true);
      const bot = new AIChatbot(disease);
      await bot.initialize();
      setChatbot(bot);

      const diseaseInfo = bot.getDiseaseInfo();
      setMessages([
        {
          role: 'bot',
          text: `नमस्ते! Hi! I'm your ${diseaseInfo.name} powered by AI. 🤖\n\nI can help you with:\n• Understanding symptoms\n• Prevention strategies\n• Treatment guidance\n• Diet and lifestyle tips\n\nWhat would you like to know about ${disease}?`
        }
      ]);
      setIsInitializing(false);
    };
    initChatbot();
  }, [disease]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !chatbot) return;

    const userMessage = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await chatbot.generateResponse(userMessage);
      setMessages(prev => [...prev, { role: 'bot', text: response }]);

      if (voiceEnabled) {
        voiceService.speak(response);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: 'I apologize, I encountered an error. Please try asking your question again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if (isListening) {
      voiceService.stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      voiceService.startListening(
        (transcript) => {
          setInputValue(transcript);
          setIsListening(false);
        },
        (error) => {
          console.error('Voice error:', error);
          setIsListening(false);
        }
      );
    }
  };

  const quickQuestions = [
    "What are the symptoms?",
    "How can I prevent it?",
    "What should I eat?",
    "When to see a doctor?"
  ];

  return (
    <div className="flex flex-col h-full glass-card rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🤖</div>
          <div>
            <h3 className="text-xl font-bold">AI Health Assistant</h3>
            <p className="text-xs opacity-90">
              {isInitializing ? 'Initializing AI...' : 'Powered by AI • Offline Ready'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-purple-50 to-white">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-6 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div className={msg.role === 'user' ? 'message-user' : 'message-bot'}>
              {msg.text}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="message-bot">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="px-6 pb-4">
          <p className="text-sm text-gray-600 mb-2">Quick Questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => setInputValue(q)}
                className="glass px-3 py-2 rounded-full text-sm text-purple-600 hover:bg-purple-100 transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Container */}
      <div className="border-t p-6 bg-white">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything..."
            className="flex-1 px-6 py-3 border-2 border-purple-200 rounded-full focus:outline-none focus:border-purple-500 transition-all"
            disabled={isLoading || isInitializing}
          />
          <button
            onClick={handleVoiceInput}
            className={`px-4 py-3 rounded-full font-semibold transition-all transform hover:scale-110 ${
              isListening
                ? 'bg-red-500 text-white pulse-glow'
                : 'bg-gradient-to-r from-green-400 to-emerald-500 text-white hover:shadow-lg'
            }`}
          >
            🎤
          </button>
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim() || isInitializing}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold hover:shadow-lg disabled:opacity-50 transition-all transform hover:scale-105"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
