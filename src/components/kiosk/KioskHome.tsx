import React, { useEffect } from 'react';
import { 
  ArrowRight, 
  Mic, 
  Clock, 
  Stethoscope, 
  ShieldCheck, 
  Languages, 
  UserCheck, 
  Sparkles, 
  HelpCircle,
  Volume2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const KioskHome: React.FC = () => {
  const { 
    setCurrentScreen, 
    resetPatientFlow, 
    setIsHelpModalOpen, 
    speakText,
    currentLanguage,
    getLanguageDetails
  } = useApp();

  const lang = getLanguageDetails(currentLanguage);

  useEffect(() => {
    // Speak welcome prompt on load
    const greeting = lang.code === 'hi'
      ? 'मेडीकियोस्क में आपका स्वागत है। परामर्श शुरू करने के लिए स्टार्ट बटन दबाएं।'
      : 'Welcome to Medikiosk. Tap Start Consultation to begin.';
    speakText(greeting, lang.code);
  }, []);

  const handleStart = () => {
    resetPatientFlow();
    setCurrentScreen('patient-id');
  };

  const handleReturning = () => {
    setCurrentScreen('patient-id');
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center py-8 sm:py-12 px-4 sm:px-6 max-w-6xl mx-auto w-full animate-fadeIn">
      
      {/* Hero Badge */}
      <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-sm font-semibold mb-6 shadow-sm">
        <Sparkles className="w-4 h-4 text-teal-600" />
        <span>AI-Powered Multilingual Healthcare Kiosk</span>
      </div>

      {/* Main Title & Subtitle */}
      <div className="text-center max-w-3xl mb-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          Welcome to <span className="text-teal-600">Medikiosk</span>
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
          Tell us what you're feeling. We'll help organize your medical history in your native language for the doctor.
        </p>
      </div>

      {/* Primary Action Buttons */}
      <div className="w-full max-w-xl space-y-4 mb-12">
        
        {/* HUGE START CONSULTATION BUTTON */}
        <button
          id="btn-start-consultation"
          onClick={handleStart}
          className="group w-full py-6 px-8 rounded-3xl bg-gradient-to-r from-teal-600 via-teal-500 to-teal-600 hover:from-teal-700 hover:via-teal-600 hover:to-teal-700 text-white font-black text-2xl sm:text-3xl shadow-xl shadow-teal-600/30 hover:shadow-2xl hover:shadow-teal-600/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center space-x-4 border-2 border-teal-400/40"
        >
          <Mic className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
          <span>START CONSULTATION</span>
          <ArrowRight className="w-7 h-7 sm:w-8 sm:h-8 group-hover:translate-x-1.5 transition-transform" />
        </button>

        {/* SECONDARY & ACCESSIBLE BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handleReturning}
            className="py-4 px-6 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-base border-2 border-slate-200 hover:border-slate-300 shadow-sm transition-all flex items-center justify-center space-x-2"
          >
            <UserCheck className="w-5 h-5 text-teal-600" />
            <span>I'm a Returning Patient</span>
          </button>

          <button
            onClick={() => setIsHelpModalOpen(true)}
            className="py-4 px-6 rounded-2xl bg-amber-50/80 hover:bg-amber-100 text-amber-900 font-bold text-base border-2 border-amber-200/80 shadow-sm transition-all flex items-center justify-center space-x-2"
          >
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <span>Need Help? / सहायता</span>
          </button>
        </div>

      </div>

      {/* Benefit Cards (3 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-8">
        
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4 font-bold">
            <Languages className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">1. Speak Naturally</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Describe your symptoms comfortably in Hindi, English, Bengali, Telugu, Tamil, and other regional languages.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 font-bold">
            <Clock className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">2. Save Consultation Time</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Your detailed symptom duration, severity, and medications are cleanly organized before you enter the doctor's room.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 font-bold">
            <Stethoscope className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">3. Doctor Ready</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            A concise, standardized clinical history summary is sent instantly to the clinician for fast, high-quality care.
          </p>
        </div>

      </div>

      {/* Trust & Safety Disclaimer */}
      <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 max-w-xl text-center">
        <ShieldCheck className="w-5 h-5 text-teal-600 flex-shrink-0" />
        <p>
          Medikiosk assists with patient intake. A qualified healthcare professional makes the final clinical decisions.
        </p>
      </div>

    </div>
  );
};
