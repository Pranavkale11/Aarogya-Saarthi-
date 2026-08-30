export class SimulationEngine {
  constructor(diseaseType) {
    this.diseaseType = diseaseType;
    this.currentDay = 1;
    this.userChoices = [];
    this.health = 100;
    this.riskLevel = 'low';
    this.scenarios = this.loadScenarios();
  }

  loadScenarios() {
    return {
      malaria: {
        day1: {
          description: "You're in a malaria-endemic area. What do you do before sleeping?",
          choices: [
            {
              text: "Use a mosquito net",
              impact: { health: 0, protection: 80, riskReduction: 'high' },
              feedback: "Excellent choice! Mosquito nets prevent bites effectively."
            },
            {
              text: "Sleep outdoors without protection",
              impact: { health: -10, protection: 0, riskReduction: 'none' },
              feedback: "This is risky! Mosquitoes are most active at night."
            },
            {
              text: "Wear long sleeves",
              impact: { health: 0, protection: 40, riskReduction: 'moderate' },
              feedback: "Good! But a net is more effective."
            }
          ]
        },
        day3: {
          description: "You notice a fever developing. What do you do?",
          choices: [
            {
              text: "Rest and drink water",
              impact: { health: -5, action: 'basic_care' },
              feedback: "Rest helps, but get tested for malaria immediately!"
            },
            {
              text: "Visit health center for malaria test",
              impact: { health: 5, action: 'seek_help' },
              feedback: "Perfect! Early diagnosis saves lives."
            },
            {
              text: "Self-medicate with random drugs",
              impact: { health: -15, action: 'wrong_action' },
              feedback: "Dangerous! Always consult a health worker."
            }
          ]
        },
        day7: {
          description: "Evaluation of your choices",
          evaluation: true
        }
      },
      
      diabetes: {
        day1: {
          description: "You want to prevent diabetes. What's your daily routine?",
          choices: [
            {
              text: "30 minutes of exercise + balanced diet",
              impact: { health: 10, protection: 75 },
              feedback: "Excellent lifestyle choice!"
            },
            {
              text: "Skip exercise, eat sugary foods",
              impact: { health: -15, protection: 0 },
              feedback: "This increases diabetes risk significantly."
            },
            {
              text: "Moderate exercise + home-cooked meals",
              impact: { health: 5, protection: 50 },
              feedback: "Good! Keep maintaining this."
            }
          ]
        },
        day7: {
          description: "Check your weight and energy levels",
          evaluation: true
        }
      },

      waterborne: {
        day1: {
          description: "Your water source has become contaminated. What do you do?",
          choices: [
            {
              text: "Boil water before drinking",
              impact: { health: 0, protection: 95 },
              feedback: "Perfect! Boiling kills harmful pathogens."
            },
            {
              text: "Drink directly from the source",
              impact: { health: -20, protection: 0 },
              feedback: "Very risky! You're exposing yourself to waterborne diseases."
            },
            {
              text: "Use water purification tablets",
              impact: { health: 0, protection: 80 },
              feedback: "Good alternative when boiling isn't possible!"
            }
          ]
        },
        day3: {
          description: "Symptoms of diarrhea appear. What do you do?",
          choices: [
            {
              text: "Drink ORS (Oral Rehydration Solution)",
              impact: { health: 10, action: 'correct_treatment' },
              feedback: "Correct! ORS prevents dehydration."
            },
            {
              text: "Stop eating completely",
              impact: { health: -10, action: 'wrong_action' },
              feedback: "Wrong! You need to maintain nutrition."
            }
          ]
        }
      }
    };
  }

  getCurrentScenario() {
    const scenarios = this.scenarios[this.diseaseType];
    if (scenarios[`day${this.currentDay}`]) {
      return scenarios[`day${this.currentDay}`];
    }
    return null;
  }

  makeChoice(choiceIndex) {
    const scenario = this.getCurrentScenario();
    if (!scenario || scenario.evaluation) {
      return { error: 'No choices available' };
    }

    const choice = scenario.choices[choiceIndex];
    this.userChoices.push({
      day: this.currentDay,
      choice: choice.text,
      impact: choice.impact,
      feedback: choice.feedback
    });

    this.health = Math.max(0, Math.min(100, this.health + choice.impact.health));
    this.calculateRiskLevel();

    return {
      feedback: choice.feedback,
      healthChange: choice.impact.health,
      currentHealth: this.health
    };
  }

  nextDay() {
    this.currentDay++;
    const nextScenario = this.getCurrentScenario();
    if (nextScenario?.evaluation) {
      return { isComplete: true, outcome: this.getOutcome() };
    }
    return { isComplete: false, scenario: nextScenario };
  }

  calculateRiskLevel() {
    if (this.health > 75) this.riskLevel = 'low';
    else if (this.health > 50) this.riskLevel = 'moderate';
    else if (this.health > 25) this.riskLevel = 'high';
    else this.riskLevel = 'critical';
  }

  getOutcome() {
    const protectionScore = this.userChoices.reduce((sum, c) => {
      return sum + (c.impact.protection || 0);
    }, 0);

    const averageProtection = protectionScore / this.userChoices.length;

    if (averageProtection > 70) {
      return {
        status: 'PROTECTED',
        message: 'Excellent! You successfully prevented the disease!',
        score: 100,
        icon: '🎉'
      };
    } else if (averageProtection > 40) {
      return {
        status: 'MODERATE',
        message: 'Good effort, but you could have made better choices.',
        score: 60,
        icon: '👍'
      };
    } else {
      return {
        status: 'AT_RISK',
        message: 'You were exposed to the disease. Learn from these mistakes!',
        score: 20,
        icon: '⚠️'
      };
    }
  }

  getDetailedFeedback() {
    return {
      choicesMade: this.userChoices,
      finalHealth: this.health,
      riskLevel: this.riskLevel,
      outcome: this.getOutcome()
    };
  }
}
