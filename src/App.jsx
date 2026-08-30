import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FrontPage } from './components/FrontPage';
import { DiseaseSelector } from './components/DiseaseSelector';
import { Prevention } from './Pages/Prevention';
import { Emergency } from './Pages/Emergency';
import { Settings } from './Pages/Settings';
import { HealthSchemes } from './Pages/HealthSchemes';
import { ProgressTracker } from './components/ProgressTracker';
import './App.css';

function App() {
  useEffect(() => {
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(reg => console.log('Service Worker registered'))
        .catch(err => console.log('Service Worker registration failed', err));
    }

    // Detect offline status
    const handleOnline = () => {
      console.log('App is online');
    };

    const handleOffline = () => {
      console.log('App is offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/prevention" element={<DiseaseSelector />} />
        <Route path="/prevention/:diseaseId" element={<Prevention />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/schemes" element={<HealthSchemes />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/progress" element={<ProgressTracker />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
