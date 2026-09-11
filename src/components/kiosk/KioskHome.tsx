import React, { useEffect } from 'react';
import { 
  ArrowRight, 
  Mic, 
  Clock, 
  Stethoscope, 
  ShieldCheck, 
  Languages, 
  UserCheck, 
  HelpCircle 
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
    const greeting = lang.code === 'hi'
      ? 'मेडीकियोस्क में आपका स्वागत है। परामर्श शुरू करने के लिए स्टार्ट बटन दबाएं।'
      : 'Welcome to MediKiosk. Tap Start Consultation to begin.';
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
    <div className="flex-1 flex flex-col justify-center items-center py-8 sm:py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full animate-fadeIn">
      
      <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-6">
        <span className="w-2 h-2 rounded-full bg-teal-600"></span>
        <span>Hospital Patient Intake • Voice & Touch</span>
      </div>

      <div className="text-center max-w-2xl mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Welcome to <span className="text-teal-600">MediKiosk</span>
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Record your symptoms and health details in your preferred language before seeing the doctor.
        </p>
      </div>

      <div className="w-full max-w-lg space-y-3 mb-10">
        <button
          id="btn-start-consultation"
          onClick={handleStart}
          className="group w-full py-5 px-6 rounded-2xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold text-xl sm:text-2xl shadow-md transition-all flex items-center justify-center space-x-3 cursor-pointer"
        >
          <Mic className="w-6 h-6 sm:w-7 sm:h-7" />
          <span>Start Consultation</span>
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            onClick={handleReturning}
            className="py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-200 shadow-sm transition-colors flex items-center justify-center space-x-2"
          >
            <UserCheck className="w-4 h-4 text-teal-600" />
            <span>Returning Patient Check-in</span>
          </button>

          <button
            onClick={() => setIsHelpModalOpen(true)}
            className="py-3 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-sm border border-amber-200 shadow-sm transition-colors flex items-center justify-center space-x-2"
          >
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>Need Help? / सहायता</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mb-8">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
            <Languages className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1">1. Speak in Your Language</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            Support for 10 regional Indian languages including Hindi, Bengali, Telugu, Tamil, and Marathi.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-3">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1">2. Faster Intake</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            Symptom duration, temperature, medications, and allergies are recorded in under 2 minutes.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
            <Stethoscope className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1">3. Doctor-Ready Summary</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            A standardized clinical summary is sent directly to the physician's screen before you enter.
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2 text-xs text-slate-500 max-w-lg text-center">
        <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
        <p>
          MediKiosk assists with intake. All diagnostic and prescription decisions are made by your physician.
        </p>
      </div>

    </div>
  );
};
