import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Mic, 
  Stethoscope, 
  ArrowRight, 
  ArrowLeft, 
  CheckSquare, 
  Square,
  Lock 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ConsentScreen: React.FC = () => {
  const { setCurrentScreen, navigateBack } = useApp();
  const [hasAgreed, setHasAgreed] = useState(true);

  const handleStart = () => {
    if (hasAgreed) {
      setCurrentScreen('voice-intake');
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 animate-fadeIn">
      
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={navigateBack}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs transition-colors shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Step 3 of 6 • Patient Consent
        </span>
      </div>

      <div className="text-center max-w-xl mx-auto mb-6">
        <div className="inline-flex items-center space-x-2 px-3 py-0.5 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold border border-teal-200 mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
          <span>Patient Privacy & Consent</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Before We Begin
        </h1>
        <p className="mt-1 text-sm text-slate-600 leading-relaxed">
          MediKiosk will ask a few straightforward questions regarding your current symptoms and health history. Your responses will be organized into a summary for the doctor.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1">Confidential & Secure</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Your intake details are encrypted and only accessible to hospital medical staff.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-3">
            <Mic className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1">Voice Intake</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Microphone audio is transcribed to extract symptoms during this session.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
            <Stethoscope className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1">Doctor Evaluation</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            The kiosk only collects history. The consulting doctor evaluates and prescribes treatment.
          </p>
        </div>

      </div>

      <div 
        onClick={() => setHasAgreed(!hasAgreed)}
        className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer mb-6 flex items-center space-x-3.5 ${
          hasAgreed 
            ? 'border-teal-600 bg-teal-50/50 shadow-sm' 
            : 'border-slate-300 bg-white hover:border-slate-400'
        }`}
      >
        <div className="shrink-0 text-teal-600">
          {hasAgreed ? (
            <CheckSquare className="w-6 h-6 fill-teal-600 text-white" />
          ) : (
            <Square className="w-6 h-6 text-slate-400" />
          )}
        </div>
        <div>
          <label className="text-sm font-bold text-slate-900 cursor-pointer block">
            I agree to proceed with the intake questions.
          </label>
          <span className="text-xs text-slate-600 block mt-0.5">
            मैं समझता/समझती हूँ और अपनी भाषा में बातचीत जारी रखने के लिए सहमत हूँ।
          </span>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleStart}
          disabled={!hasAgreed}
          className={`w-full sm:w-auto px-10 py-3.5 rounded-xl font-bold text-base shadow-md transition-all flex items-center justify-center space-x-2.5 ${
            hasAgreed 
              ? 'bg-teal-600 hover:bg-teal-700 text-white cursor-pointer' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
          }`}
        >
          <span>Start Intake / शुरुआत करें</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
