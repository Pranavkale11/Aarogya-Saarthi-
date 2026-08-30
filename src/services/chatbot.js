import * as ort from 'onnxruntime-web';
import { getFromIndexedDB, saveToIndexedDB } from './storageService';

export class DiseaseSpecificChatbot {
  constructor(diseaseType) {
    this.diseaseType = diseaseType;
    this.model = null;
    this.tokenizer = null;
    this.conversationHistory = [];
    this.diseaseKnowledge = this.loadDiseaseKnowledge();
  }

  loadDiseaseKnowledge() {
    const knowledge = {
      malaria: {
        name: "Malaria Prevention Expert",
        symptoms: ["Fever", "Chills", "Headache", "Muscle pain"],
        prevention: ["Mosquito nets", "Insect repellent", "Prophylaxis"],
        transmission: "Mosquito bites (Anopheles mosquito)",
        facts: [
          "Malaria parasites are transmitted through mosquito bites",
          "Using an insecticide-treated mosquito net reduces malaria risk by 70%",
          "Fever typically appears 7-30 days after infection",
          "Early treatment is crucial for recovery"
        ]
      },
      diabetes: {
        name: "Diabetes Prevention Coach",
        symptoms: ["Increased thirst", "Frequent urination", "Fatigue", "Blurred vision"],
        prevention: ["Regular exercise", "Healthy diet", "Weight management", "Stress reduction"],
        transmission: "Not contagious - lifestyle related",
        facts: [
          "Regular physical activity reduces diabetes risk by 50%",
          "A 5-10% weight loss can significantly improve health",
          "Type 2 diabetes can often be prevented through lifestyle changes",
          "Blood sugar monitoring is important for early detection"
        ]
      },
      waterborne: {
        name: "Water Safety Expert",
        symptoms: ["Diarrhea", "Nausea", "Abdominal cramps", "Dehydration"],
        prevention: ["Boil water", "Use purification tablets", "Proper sanitation", "Handwashing"],
        transmission: "Contaminated water",
        facts: [
          "Boiling water for 1 minute kills most harmful pathogens",
          "Safe drinking water is essential for health",
          "Proper hand hygiene prevents 40% of diarrheal diseases",
          "ORS (Oral Rehydration Solution) is crucial in treating dehydration"
        ]
      }
    };
    return knowledge[this.diseaseType] || knowledge.malaria;
  }

  async initialize() {
    try {
      // Load pre-trained model from IndexedDB or online
      let modelData = await getFromIndexedDB('chatbot-models', this.diseaseType);
      
      if (!modelData) {
        console.log(`Downloading model for ${this.diseaseType}...`);
        // In production, download from a model server
        // For MVP, we'll use a lightweight response system
        this.useResponseSystem = true;
      } else {
        this.model = await ort.InferenceSession.create(modelData.buffer);
      }
      
      console.log(`Chatbot initialized for ${this.diseaseType}`);
      return true;
    } catch (error) {
      console.error('Error initializing chatbot:', error);
      this.useResponseSystem = true; // Fallback
      return false;
    }
  }

  async generateResponse(userMessage) {
    this.conversationHistory.push({
      role: 'user',
      message: userMessage,
      timestamp: new Date()
    });

    let response;
    
    if (this.useResponseSystem) {
      // Rule-based response system for MVP
      response = this.generateRuleBasedResponse(userMessage);
    } else {
      // Use ML model if available
      response = await this.generateMLResponse(userMessage);
    }

    this.conversationHistory.push({
      role: 'assistant',
      message: response,
      timestamp: new Date()
    });

    return response;
  }

  generateRuleBasedResponse(userMessage) {
    const message = userMessage.toLowerCase();
    const knowledge = this.diseaseKnowledge;

    // Check for symptom questions
    if (message.includes('symptom') || message.includes('signs')) {
      return `Common symptoms of this condition: ${knowledge.symptoms.join(', ')}. If you experience these, consult a health worker immediately.`;
    }

    // Check for prevention questions
    if (message.includes('prevent') || message.includes('prevention')) {
      return `Prevention methods: ${knowledge.prevention.join(', ')}. These practices can significantly reduce your risk.`;
    }

    // Check for transmission questions
    if (message.includes('spread') || message.includes('transmit') || message.includes('contagious')) {
      return `This condition is transmitted through: ${knowledge.transmission}. Understanding transmission helps you stay protected.`;
    }

    // Check for treatment questions
    if (message.includes('treat') || message.includes('cure') || message.includes('medicine')) {
      return `For treatment, always consult with a qualified health worker. Early diagnosis and treatment are crucial for recovery.`;
    }

    // General facts
    if (message.includes('fact') || message.includes('know') || message.includes('tell')) {
      const randomFact = knowledge.facts[Math.floor(Math.random() * knowledge.facts.length)];
      return `Did you know? ${randomFact}`;
    }

    // Default response
    return `I'm here to help with information about ${knowledge.name}. You can ask me about symptoms, prevention, transmission, or facts related to this condition.`;
  }

  async generateMLResponse(userMessage) {
    // Placeholder for ML-based response
    // In production, tokenize, run model, and decode
    return this.generateRuleBasedResponse(userMessage);
  }

  getConversationHistory() {
    return this.conversationHistory;
  }

  clearHistory() {
    this.conversationHistory = [];
  }

  getDiseaseInfo() {
    return this.diseaseKnowledge;
  }
}
