import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set, get) => ({
      // User Data
      userLanguage: 'en',
      userName: '',
      
      // Disease Prevention State
      selectedDisease: null,
      currentSimulation: null,
      simulationProgress: {},
      
      // Emergency State
      selectedEmergency: null,
      
      // User Progress
      completedSimulations: [],
      badges: [],
      totalScore: 0,
      
      // Voice Settings
      voiceEnabled: true,
      voiceLanguage: 'en',
      
      // Offline Status
      isOffline: false,
      lastSyncTime: null,
      
      // Actions - User Settings
      setLanguage: (lang) => set({ userLanguage: lang }),
      setUserName: (name) => set({ userName: name }),
      setVoiceEnabled: (enabled) => set({ voiceEnabled: enabled }),
      
      // Actions - Disease Prevention
      selectDisease: (disease) => set({ selectedDisease: disease }),
      startSimulation: (disease) => set({ 
        currentSimulation: disease,
        selectedDisease: disease 
      }),
      // Government Schemes State
      savedSchemes: [],
      currentSchemeIndex: 0,

      // Actions - Schemes
      saveScheme: (schemeId) => set((state) => ({
        savedSchemes: state.savedSchemes.includes(schemeId)
          ? state.savedSchemes
          : [...state.savedSchemes, schemeId]
      })),

      removeSavedScheme: (schemeId) => set((state) => ({
        savedSchemes: state.savedSchemes.filter(id => id !== schemeId)
      })),

      setCurrentSchemeIndex: (index) => set({ currentSchemeIndex: index }),
      
      // Actions - Progress Tracking
      completeSimulation: (disease) => set((state) => ({
        completedSimulations: [...state.completedSimulations, disease],
        totalScore: state.totalScore + 10,
        badges: state.badges.includes(`${disease}-expert`) 
          ? state.badges 
          : [...state.badges, `${disease}-expert`]
      })),
      
      addBadge: (badge) => set((state) => ({
        badges: state.badges.includes(badge) ? state.badges : [...state.badges, badge]
      })),
      
      updateSimulationProgress: (disease, progress) => set((state) => ({
        simulationProgress: {
          ...state.simulationProgress,
          [disease]: progress
        }
      })),
      
      // Actions - Emergency
      selectEmergency: (emergency) => set({ selectedEmergency: emergency }),
      
      // Actions - Network
      setOfflineStatus: (isOffline) => set({ isOffline }),
      updateLastSyncTime: () => set({ lastSyncTime: new Date().toISOString() }),
      
      // Reset Function
      resetProgress: () => set({
        completedSimulations: [],
        badges: [],
        totalScore: 0,
        simulationProgress: {}
      })
    }),
    {
      name: 'aarogya-saarthi-storage',
      version: 1,
    }
  )
);
