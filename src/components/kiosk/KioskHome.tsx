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
    <div className="flex-1 flex flex-col justify-center items-center py-6 sm:py-10 px-4 sm:px-6 max-w-4xl mx-auto w-full animate-fadeIn">
      
      <div className="w-full bg-white border border-slate-200 rounded-xl shadow-sm p-6 sm:p-8 mb-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-medium mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
              <span>Self-Service OPD Terminal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Patient Check-in & Symptom Intake
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Tell the kiosk your symptoms in your language, and scan old records — before you see the doctor.
            </p>
          </div>

          <button
            onClick={() => setIsHelpModalOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 font-medium text-xs border border-amber-200 transition-colors flex items-center space-x-1.5 shrink-0"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>Need Help? / सहायता</span>
          </button>
        </div>

        <div className="py-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            id="btn-start-consultation"
            onClick={handleStart}
            className="w-full p-5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-left transition-colors shadow-sm flex flex-col justify-between cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <Mic className="w-5 h-5" />
              </div>
              <ArrowRight className="w-5 h-5 text-teal-200 group-hover:translate-x-1 transition-transform" />
            </div>
            <div>
              <div className="text-lg font-bold">Start New Intake</div>
              <p className="text-xs text-teal-100 mt-0.5">
                Speak in your language — or type if you prefer
              </p>
            </div>
          </button>

          <button
            onClick={handleReturning}
            className="w-full p-5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 text-left border border-slate-200 transition-colors shadow-sm flex flex-col justify-between cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-teal-700" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <div>
              <div className="text-lg font-bold">Returning Patient Check-in</div>
              <p className="text-xs text-slate-500 mt-0.5">
                Use your hospital Patient ID to retrieve existing records
              </p>
            </div>
          </button>
        </div>

        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
          <div className="flex items-center space-x-2.5 p-2 rounded-lg bg-slate-50">
            <Languages className="w-4 h-4 text-teal-700 shrink-0" />
            <span>10 Indian regional languages</span>
          </div>
          <div className="flex items-center space-x-2.5 p-2 rounded-lg bg-slate-50">
            <Clock className="w-4 h-4 text-teal-700 shrink-0" />
            <span>Doctor reviews your summary in under 2 mins</span>
          </div>
          <div className="flex items-center space-x-2.5 p-2 rounded-lg bg-slate-50">
            <Stethoscope className="w-4 h-4 text-teal-700 shrink-0" />
            <span>Direct summary routing to doctor</span>
          </div>
        </div>

      </div>

      <div className="flex items-center space-x-2 text-xs text-slate-500 max-w-lg text-center">
        <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
        <p>
          MediKiosk assists with administrative and clinical intake. A qualified physician evaluates all findings.
        </p>
      </div>

    </div>
  );
};
