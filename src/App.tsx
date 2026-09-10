import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { AccessibilityModal } from './components/common/AccessibilityModal';
import { HelpModal } from './components/common/HelpModal';
import { AboutModal } from './components/common/AboutModal';
import { UrgentAlertModal } from './components/common/UrgentAlertModal';

// Kiosk Patient Screens
import { KioskHome } from './components/kiosk/KioskHome';
import { PatientIdentification } from './components/kiosk/PatientIdentification';
import { LanguageSelection } from './components/kiosk/LanguageSelection';
import { ConsentScreen } from './components/kiosk/ConsentScreen';
import { VoiceIntakeScreen } from './components/kiosk/VoiceIntakeScreen';
import { AIConversationScreen } from './components/kiosk/AIConversationScreen';
import { ReviewScreen } from './components/kiosk/ReviewScreen';
import { ClinicalSummaryScreen } from './components/kiosk/ClinicalSummaryScreen';

// Doctor Screens
import { DoctorSidebar } from './components/doctor/DoctorSidebar';
import { DoctorDashboard } from './components/doctor/DoctorDashboard';
import { DoctorPatientSummary } from './components/doctor/DoctorPatientSummary';
import { DoctorConversationView } from './components/doctor/DoctorConversationView';

const MainAppContent: React.FC = () => {
  const { currentScreen, toastMessage } = useApp();
  const [doctorActiveTab, setDoctorActiveTab] = useState<'dashboard' | 'queue' | 'consultations' | 'completed' | 'settings'>('dashboard');

  const isDoctorMode = currentScreen.startsWith('doctor-');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-teal-100 selection:text-teal-900">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-teal-500/40 text-xs sm:text-sm font-bold flex items-center space-x-2.5 animate-bounce">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 flex flex-col">
        {isDoctorMode ? (
          /* Doctor Layout with Sidebar */
          <div className="flex-1 flex flex-col lg:flex-row">
            <DoctorSidebar activeTab={doctorActiveTab} setActiveTab={setDoctorActiveTab} />
            
            <div className="flex-1 flex flex-col bg-slate-50/50">
              {currentScreen === 'doctor-dashboard' && <DoctorDashboard />}
              {currentScreen === 'doctor-patient-summary' && <DoctorPatientSummary />}
              {currentScreen === 'doctor-conversation' && <DoctorConversationView />}
            </div>
          </div>
        ) : (
          /* Patient Kiosk Fullscreen Centered Layout */
          <div className="flex-1 flex flex-col justify-center">
            {currentScreen === 'kiosk-home' && <KioskHome />}
            {currentScreen === 'patient-id' && <PatientIdentification />}
            {currentScreen === 'language' && <LanguageSelection />}
            {currentScreen === 'consent' && <ConsentScreen />}
            {currentScreen === 'voice-intake' && <VoiceIntakeScreen />}
            {currentScreen === 'ai-conversation' && <AIConversationScreen />}
            {currentScreen === 'review' && <ReviewScreen />}
            {currentScreen === 'clinical-summary' && <ClinicalSummaryScreen />}
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Modals */}
      <AccessibilityModal />
      <HelpModal />
      <AboutModal />
      <UrgentAlertModal />

    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}

export default App;
