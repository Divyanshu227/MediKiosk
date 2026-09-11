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
    <div className="flex-1 flex flex-col justify-center max-w-3xl mx-auto w-full px-4 sm:px-6 py-6 animate-fadeIn">
      
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={navigateBack}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs transition-colors shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Step 3 of 6 • Patient Consent
        </span>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-sm mb-4">
        <div className="mb-5">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded bg-teal-50 text-teal-800 text-xs font-medium border border-teal-200 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
            <span>Patient Privacy & Consent</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Intake Disclosure & Consent
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Please review the following points before starting the voice-assisted questionnaire.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
          
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col">
            <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center mb-2.5">
              <Lock className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-900 mb-1">Confidential & Secure</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Your intake responses are confidential and only visible to authorized hospital medical staff.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-800 flex items-center justify-center mb-2.5">
              <Mic className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-900 mb-1">Voice Intake</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Audio input is transcribed and organized into structured clinical notes during this session.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center mb-2.5">
              <Stethoscope className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-900 mb-1">Physician Authority</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              The terminal organizes medical history only. Your attending physician evaluates and prescribes treatment.
            </p>
          </div>

        </div>

        <div 
          onClick={() => setHasAgreed(!hasAgreed)}
          className={`p-3.5 rounded-lg border-2 transition-colors cursor-pointer mb-5 flex items-center space-x-3 ${
            hasAgreed 
              ? 'border-teal-700 bg-teal-50/40' 
              : 'border-slate-300 bg-white hover:border-slate-400'
          }`}
        >
          <div className="shrink-0 text-teal-700">
            {hasAgreed ? (
              <CheckSquare className="w-5 h-5 fill-teal-700 text-white" />
            ) : (
              <Square className="w-5 h-5 text-slate-400" />
            )}
          </div>
          <div>
            <label className="text-xs sm:text-sm font-semibold text-slate-900 cursor-pointer block">
              I agree to proceed with the intake questionnaire.
            </label>
            <span className="text-[11px] text-slate-600 block mt-0.5">
              मैं समझता/समझती हूँ और अपनी भाषा में बातचीत जारी रखने के लिए सहमत हूँ।
            </span>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleStart}
            disabled={!hasAgreed}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-lg font-medium text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center space-x-1.5 ${
              hasAgreed 
                ? 'bg-teal-700 hover:bg-teal-800 text-white cursor-pointer' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            <span>Start Intake / शुरुआत करें</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
