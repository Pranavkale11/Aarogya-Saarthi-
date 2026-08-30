import { pipeline } from '@xenova/transformers';

export class AIChatbot {
  constructor(diseaseType) {
    this.diseaseType = diseaseType;
    this.model = null;
    this.conversationHistory = [];
    this.diseaseKnowledge = this.loadDiseaseKnowledge();
    this.isModelLoaded = false;
  }

  async initialize() {
    try {
      console.log('Initializing AI chatbot...');
      
      // Load a lightweight conversational model that works offline
      // Using FLAN-T5 small model (77MB) - works in browser
      this.model = await pipeline(
        'text2text-generation',
        'Xenova/flan-t5-small',
        { quantized: true }
      );
      
      this.isModelLoaded = true;
      console.log('AI chatbot initialized successfully');
      return true;
    } catch (error) {
      console.error('Error loading AI model:', error);
      this.isModelLoaded = false;
      return false;
    }
  }

  loadDiseaseKnowledge() {
    const knowledge = {
      malaria: {
        name: "Malaria Prevention Expert",
        context: "You are an expert in malaria prevention. Provide accurate, helpful information about preventing, recognizing, and treating malaria. Focus on practical advice for rural communities.",
        symptoms: ["Fever", "Chills", "Headache", "Muscle pain", "Fatigue", "Nausea"],
        prevention: ["Use insecticide-treated mosquito nets", "Apply insect repellent", "Wear long sleeves", "Take prophylaxis medicine"],
        keyFacts: [
          "Malaria is transmitted through mosquito bites",
          "Symptoms appear 7-30 days after infection",
          "Early treatment is crucial for recovery",
          "Mosquito nets reduce risk by 70%"
        ]
      },
      diabetes: {
        name: "Diabetes Prevention Coach",
        context: "You are a diabetes prevention expert. Provide guidance on lifestyle changes, diet, and exercise to prevent type 2 diabetes.",
        symptoms: ["Increased thirst", "Frequent urination", "Fatigue", "Blurred vision", "Slow healing wounds"],
        prevention: ["Regular exercise 30min daily", "Healthy balanced diet", "Maintain healthy weight", "Reduce sugar intake"],
        keyFacts: [
          "Physical activity reduces diabetes risk by 50%",
          "5-10% weight loss significantly improves health",
          "Type 2 diabetes can be prevented through lifestyle changes",
          "Regular blood sugar monitoring is important"
        ]
      },
      waterborne: {
        name: "Water Safety Expert",
        context: "You are an expert in waterborne disease prevention. Provide guidance on safe water practices, sanitation, and hygiene.",
        symptoms: ["Diarrhea", "Nausea", "Vomiting", "Abdominal cramps", "Dehydration"],
        prevention: ["Boil water for 1 minute", "Use water purification tablets", "Practice proper handwashing", "Maintain clean sanitation"],
        keyFacts: [
          "Boiling kills most harmful pathogens",
          "Hand hygiene prevents 40% of diarrheal diseases",
          "ORS is crucial for treating dehydration",
          "Safe drinking water is essential for health"
        ]
      }
    };
    return knowledge[this.diseaseType] || knowledge.malaria;
  }

  async generateResponse(userMessage) {
    this.conversationHistory.push({
      role: 'user',
      message: userMessage,
      timestamp: new Date()
    });

    let response;

    if (this.isModelLoaded && this.model) {
      // Use AI model for intelligent responses
      response = await this.generateAIResponse(userMessage);
    } else {
      // Fallback to enhanced rule-based system
      response = this.generateEnhancedResponse(userMessage);
    }

    this.conversationHistory.push({
      role: 'assistant',
      message: response,
      timestamp: new Date()
    });

    return response;
  }

  async generateAIResponse(userMessage) {
    try {
      const knowledge = this.diseaseKnowledge;
      
      // Create a context-rich prompt
      const prompt = `Context: ${knowledge.context}

Disease: ${this.diseaseType}
Symptoms: ${knowledge.symptoms.join(', ')}
Prevention: ${knowledge.prevention.join(', ')}

User Question: ${userMessage}

Provide a helpful, accurate, and empathetic response in simple language suitable for rural communities. Keep the response under 100 words.

Response:`;

      // Generate response using AI model
      const result = await this.model(prompt, {
        max_new_tokens: 150,
        temperature: 0.7,
        top_p: 0.9,
      });

      return result[0].generated_text.trim();
    } catch (error) {
      console.error('AI generation error:', error);
      return this.generateEnhancedResponse(userMessage);
    }
  }

  generateEnhancedResponse(userMessage) {
    const message = userMessage.toLowerCase();
    const knowledge = this.diseaseKnowledge;

    // Enhanced keyword matching with context
    const responses = {
      symptoms: `Common symptoms of ${this.diseaseType}: ${knowledge.symptoms.join(', ')}. If you experience these symptoms, please consult a health worker immediately. Early detection is key to effective treatment.`,
      
      prevention: `To prevent ${this.diseaseType}, follow these steps:\n${knowledge.prevention.map((p, i) => `${i + 1}. ${p}`).join('\n')}\n\nThese practices can significantly reduce your risk.`,
      
      treatment: `For ${this.diseaseType} treatment, always consult a qualified health worker or visit your nearest health center. They can provide proper diagnosis and treatment. Never self-medicate. Early medical attention greatly improves outcomes.`,
      
      transmission: `${knowledge.keyFacts[0]}. Understanding how ${this.diseaseType} spreads helps you take the right precautions to protect yourself and your family.`,
      
      emergency: `If you experience severe symptoms like high fever, difficulty breathing, or persistent vomiting, seek immediate medical help. Call emergency services or visit the nearest health center right away. Time is critical in emergencies.`,
      
      diet: `For ${this.diseaseType} prevention, maintain a balanced diet rich in fruits, vegetables, and whole grains. Stay well-hydrated with clean, safe water. Avoid processed foods high in sugar and unhealthy fats.`,
      
      exercise: `Regular physical activity for at least 30 minutes daily can significantly reduce your risk of ${this.diseaseType}. This can include walking, farming activities, yoga, or household chores. Stay active to stay healthy!`
    };

    // Intelligent keyword detection
    if (message.includes('symptom') || message.includes('sign') || message.includes('feel')) {
      return responses.symptoms;
    }
    if (message.includes('prevent') || message.includes('avoid') || message.includes('protect')) {
      return responses.prevention;
    }
    if (message.includes('treat') || message.includes('cure') || message.includes('medicine') || message.includes('doctor')) {
      return responses.treatment;
    }
    if (message.includes('spread') || message.includes('transmit') || message.includes('contagious') || message.includes('catch')) {
      return responses.transmission;
    }
    if (message.includes('emergency') || message.includes('urgent') || message.includes('severe') || message.includes('serious')) {
      return responses.emergency;
    }
    if (message.includes('food') || message.includes('diet') || message.includes('eat') || message.includes('nutrition')) {
      return responses.diet;
    }
    if (message.includes('exercise') || message.includes('activity') || message.includes('workout') || message.includes('physical')) {
      return responses.exercise;
    }

    // Default contextual response
    const randomFact = knowledge.keyFacts[Math.floor(Math.random() * knowledge.keyFacts.length)];
    return `I'm your ${knowledge.name}, here to help you understand ${this.diseaseType} better. ${randomFact}\n\nYou can ask me about:\n• Symptoms and warning signs\n• Prevention methods\n• Treatment options\n• Diet and lifestyle changes\n\nWhat would you like to know?`;
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
