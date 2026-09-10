import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Mic, 
  Stethoscope, 
  ArrowRight, 
  ArrowLeft, 
  CheckSquare, 
  Square,
  Lock,
  HeartHandshake
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ConsentScreen: React.FC = () => {
  const { setCurrentScreen, navigateBack, currentLanguage, getLanguageDetails } = useApp();
  const [hasAgreed, setHasAgreed] = useState(true);

  const lang = getLanguageDetails(currentLanguage);

  const handleStart = () => {
    if (hasAgreed) {
      setCurrentScreen('voice-intake');
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 animate-fadeIn">
      
      {/* Back Button & Step Indicator */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={navigateBack}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
          Step 3 of 6 • Patient Consent
        </span>
      </div>

      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider border border-teal-200 mb-3">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>Patient Privacy & Consent</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Before we begin
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Medikiosk will ask you a few simple questions about your symptoms and health history. Your responses will be organized into a clinical summary and shared directly with the doctor handling your consultation.
        </p>
      </div>

      {/* 3 Clear Trust Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        
        {/* Pillar 1: Privacy */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
            <Lock className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1.5">Strictly Private & Secure</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Your health information is confidential, encrypted, and only visible to authorized hospital medical staff.
          </p>
        </div>

        {/* Pillar 2: Voice Capture */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
            <Mic className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1.5">Voice-Assisted Intake</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Voice recording is used solely to transcribe and structure your symptoms into clinical format during this session.
          </p>
        </div>

        {/* Pillar 3: Doctor in Control */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <Stethoscope className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1.5">Doctor Review Required</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            The AI does not make prescriptions. The attending human physician evaluates your condition and provides treatment.
          </p>
        </div>

      </div>

      {/* Checkbox Consent Agreement Card */}
      <div 
        onClick={() => setHasAgreed(!hasAgreed)}
        className={`p-6 rounded-3xl border-2 transition-all cursor-pointer mb-8 flex items-center space-x-4 ${
          hasAgreed 
            ? 'border-teal-600 bg-teal-50/60 shadow-md ring-2 ring-teal-500/10' 
            : 'border-slate-300 bg-white hover:border-slate-400'
        }`}
      >
        <div className="flex-shrink-0 text-teal-600">
          {hasAgreed ? (
            <CheckSquare className="w-8 h-8 fill-teal-600 text-white" />
          ) : (
            <Square className="w-8 h-8 text-slate-400" />
          )}
        </div>
        <div>
          <label className="text-base font-bold text-slate-900 cursor-pointer block">
            I understand and agree to continue with the AI-assisted intake.
          </label>
          <span className="text-xs text-slate-600 block mt-0.5">
            मैं समझता/समझती हूँ और अपनी भाषा में बातचीत जारी रखने के लिए सहमत हूँ।
          </span>
        </div>
      </div>

      {/* CTA Button */}
      <div className="flex justify-center">
        <button
          onClick={handleStart}
          disabled={!hasAgreed}
          className={`w-full sm:w-auto px-12 py-5 rounded-2xl font-black text-xl shadow-xl transition-all flex items-center justify-center space-x-3 ${
            hasAgreed 
              ? 'bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-teal-600/30 transform hover:-translate-y-0.5' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
          }`}
        >
          <span>Start Intake / शुरुआत करें</span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

    </div>
  );
};
